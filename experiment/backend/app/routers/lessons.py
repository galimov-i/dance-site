from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from datetime import datetime, timezone
from app.database import get_db
from app.models import Lesson, User, Subscription, SubscriptionStatus
from app.schemas import LessonResponse
from app.routers.auth import get_current_user

router = APIRouter(prefix="/lessons", tags=["lessons"])


@router.get("/me", response_model=list[LessonResponse])
async def get_my_lessons(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    is_attended: Optional[bool] = Query(None),
    limit: int = Query(50, ge=1, le=100)
):
    """Get lessons for the current user."""
    query = select(Lesson).where(Lesson.user_id == current_user.id)
    
    if is_attended is not None:
        query = query.where(Lesson.is_attended == is_attended)
    
    query = query.order_by(Lesson.start_time.desc()).limit(limit)
    
    result = await db.execute(query)
    lessons = result.scalars().all()
    
    return lessons


@router.get("/subscription/balance")
async def get_subscription_balance(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get subscription balance (remaining classes and days)."""
    result = await db.execute(
        select(Subscription).where(
            Subscription.user_id == current_user.id,
            Subscription.status == SubscriptionStatus.ACTIVE
        ).order_by(Subscription.created_at.desc())
    )
    active_subscriptions = result.scalars().all()
    
    total_remaining_classes = sum(sub.remaining_classes for sub in active_subscriptions)
    
    # Find the latest end date
    latest_end_date = None
    for sub in active_subscriptions:
        if sub.end_date and (not latest_end_date or sub.end_date > latest_end_date):
            latest_end_date = sub.end_date
    
    days_remaining = None
    if latest_end_date:
        now = datetime.now(timezone.utc).replace(tzinfo=None)
        delta = latest_end_date - now
        days_remaining = max(0, delta.days) if delta.days > 0 else 0
    
    return {
        "remaining_classes": total_remaining_classes,
        "days_remaining": days_remaining,
        "active_subscriptions": len(active_subscriptions),
    }

