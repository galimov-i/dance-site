from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from typing import Optional
from app.database import get_db
from app.services.calendar import CalendarService
from app.schemas import SlotResponse, TimeSlot, DanceStyle

router = APIRouter(prefix="/slots", tags=["slots"])


@router.get("", response_model=SlotResponse)
async def get_available_slots(
    start_date: Optional[str] = Query(None, description="Start date in ISO format"),
    end_date: Optional[str] = Query(None, description="End date in ISO format"),
    style: Optional[DanceStyle] = Query(None, description="Filter by dance style"),
    db: AsyncSession = Depends(get_db)
):
    """
    Get available time slots.
    Integrates with Google Calendar and database bookings.
    """
    calendar_service = CalendarService()
    
    # Parse dates
    start = None
    end = None
    
    if start_date:
        try:
            start = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
        except ValueError:
            start = datetime.fromisoformat(start_date)
    
    if end_date:
        try:
            end = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
        except ValueError:
            end = datetime.fromisoformat(end_date)
    
    # Get available slots
    slots = await calendar_service.get_available_slots(db, start, end, style)
    
    return SlotResponse(
        slots=slots,
        total_count=len(slots)
    )

