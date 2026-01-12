from typing import List, Optional
from datetime import datetime, timedelta, timezone
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from app.config import settings
from app.schemas import TimeSlot, DanceStyle
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import Lesson
import logging

logger = logging.getLogger(__name__)


class CalendarService:
    """Service for managing Google Calendar integration and time slots."""

    def __init__(self):
        self.service = None
        self.calendar_id = settings.google_calendar_id
        self._initialize_service()

    def _initialize_service(self):
        """Initialize Google Calendar API service."""
        if not settings.google_service_account_file or not self.calendar_id:
            logger.warning("Google Calendar credentials not configured")
            return

        try:
            SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
            credentials = service_account.Credentials.from_service_account_file(
                settings.google_service_account_file,
                scopes=SCOPES
            )
            self.service = build('calendar', 'v3', credentials=credentials)
            logger.info("Google Calendar service initialized")
        except Exception as e:
            logger.error(f"Failed to initialize Google Calendar service: {e}")
            self.service = None

    async def get_available_slots(
        self,
        db: AsyncSession,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        style: Optional[DanceStyle] = None
    ) -> List[TimeSlot]:
        """
        Get available time slots by:
        1. Reading booked lessons from database
        2. Reading events from Google Calendar
        3. Resolving conflicts and returning free slots
        """
        if not start_date:
            start_date = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0, tzinfo=None)
        if not end_date:
            end_date = start_date + timedelta(days=30)  # Next 30 days by default

        # Get booked lessons from database
        booked_lessons = await self._get_booked_lessons(db, start_date, end_date)

        # Get calendar events
        calendar_events = await self._get_calendar_events(start_date, end_date)

        # Generate available slots
        available_slots = self._generate_slots(
            start_date, end_date, booked_lessons, calendar_events, style
        )

        return available_slots

    async def _get_booked_lessons(
        self,
        db: AsyncSession,
        start_date: datetime,
        end_date: datetime
    ) -> List[Lesson]:
        """Get booked lessons from database."""
        result = await db.execute(
            select(Lesson).where(
                Lesson.start_time >= start_date,
                Lesson.start_time <= end_date
            )
        )
        return list(result.scalars().all())

    async def _get_calendar_events(
        self,
        start_date: datetime,
        end_date: datetime
    ) -> List[dict]:
        """Get events from Google Calendar."""
        if not self.service or not self.calendar_id:
            logger.warning("Google Calendar not configured, returning empty events")
            return []

        try:
            # Run synchronous Google API call in thread pool to avoid blocking
            import asyncio
            try:
                loop = asyncio.get_running_loop()
            except RuntimeError:
                loop = asyncio.get_event_loop()
            
            def fetch_events():
                return self.service.events().list(
                    calendarId=self.calendar_id,
                    timeMin=start_date.isoformat() + 'Z',
                    timeMax=end_date.isoformat() + 'Z',
                    singleEvents=True,
                    orderBy='startTime'
                ).execute()
            
            events_result = await loop.run_in_executor(None, fetch_events)
            events = events_result.get('items', [])
            return events
        except HttpError as e:
            logger.error(f"Error fetching calendar events: {e}")
            return []
        except Exception as e:
            logger.error(f"Unexpected error fetching calendar events: {e}")
            return []

    def _generate_slots(
        self,
        start_date: datetime,
        end_date: datetime,
        booked_lessons: List[Lesson],
        calendar_events: List[dict],
        style: Optional[DanceStyle]
    ) -> List[TimeSlot]:
        """Generate available time slots."""
        slots = []
        current_date = start_date

        # Standard lesson duration: 60 minutes
        lesson_duration = timedelta(hours=1)
        
        # Available hours (Moscow time, adjust as needed)
        # Example: 10:00 - 22:00
        available_hours = list(range(10, 22))

        # Create a set of busy time periods
        busy_periods = set()
        
        # Add booked lessons
        for lesson in booked_lessons:
            busy_periods.add((
                lesson.start_time.replace(tzinfo=None),
                lesson.end_time.replace(tzinfo=None)
            ))
        
        # Add calendar events
        for event in calendar_events:
            start_str = event['start'].get('dateTime') or event['start'].get('date')
            end_str = event['end'].get('dateTime') or event['end'].get('date')
            
            try:
                # Parse datetime
                if 'T' in start_str:
                    event_start = datetime.fromisoformat(start_str.replace('Z', '+00:00'))
                    event_end = datetime.fromisoformat(end_str.replace('Z', '+00:00'))
                    # Convert to naive UTC for comparison
                    event_start = event_start.replace(tzinfo=None)
                    event_end = event_end.replace(tzinfo=None)
                else:
                    # All-day event
                    event_start = datetime.fromisoformat(start_str)
                    event_end = datetime.fromisoformat(end_str)
                
                busy_periods.add((event_start, event_end))
            except Exception as e:
                logger.warning(f"Error parsing calendar event: {e}")
                continue

        # Generate slots for each day
        while current_date < end_date:
            for hour in available_hours:
                slot_start = current_date.replace(hour=hour, minute=0, second=0, microsecond=0)
                slot_end = slot_start + lesson_duration
                
                # Skip if slot is in the past
                if slot_start < datetime.now(timezone.utc).replace(tzinfo=None):
                    continue
                
                # Check if slot conflicts with busy periods
                is_busy = False
                for busy_start, busy_end in busy_periods:
                    if not (slot_end <= busy_start or slot_start >= busy_end):
                        is_busy = True
                        break
                
                if not is_busy:
                    slots.append(TimeSlot(
                        date=slot_start.date().isoformat(),
                        start_time=slot_start.isoformat(),
                        end_time=slot_end.isoformat(),
                        style=style,
                        is_available=True
                    ))
            
            current_date += timedelta(days=1)

        return slots

