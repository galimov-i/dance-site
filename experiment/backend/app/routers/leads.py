from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Lead
from app.schemas import LeadCreate, LeadResponse
from app.tasks.notifications import send_telegram_notification, send_sms_notification
from datetime import datetime

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(lead_data: LeadCreate, db: AsyncSession = Depends(get_db)):
    """
    Create a new lead.
    Responds quickly and triggers async notifications via Celery.
    """
    # Create lead record
    new_lead = Lead(
        name=lead_data.name,
        phone=lead_data.phone,
        style=lead_data.style,
        preferred_time=lead_data.preferred_time,
        comment=lead_data.comment,
    )
    
    db.add(new_lead)
    await db.commit()
    await db.refresh(new_lead)
    
    # Trigger async notifications (non-blocking)
    message = (
        f"<b>Новая заявка</b>\n\n"
        f"Имя: {new_lead.name}\n"
        f"Телефон: {new_lead.phone}\n"
        f"Стиль: {new_lead.style.value if new_lead.style else 'Не указан'}\n"
        f"Предпочтительное время: {new_lead.preferred_time or 'Не указано'}\n"
        f"Комментарий: {new_lead.comment or 'Нет'}\n"
        f"Дата: {new_lead.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
    )
    
    # Send Telegram notification asynchronously
    send_telegram_notification.delay(message)
    
    # Optionally send SMS (configured but may not be active)
    sms_message = f"Новая заявка от {new_lead.name}, {new_lead.phone}"
    send_sms_notification.delay(new_lead.phone, sms_message)
    
    return new_lead


@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: int, db: AsyncSession = Depends(get_db)):
    """Get a lead by ID."""
    lead = await db.get(Lead, lead_id)
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    return lead

