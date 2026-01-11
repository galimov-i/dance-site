from app.celery_app import celery_app
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta, timezone
from app.database import AsyncSessionLocal
from app.models import Subscription, SubscriptionStatus
from app.tasks.notifications import send_telegram_notification
import logging

logger = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.check_subscription_expiration")
def check_subscription_expiration() -> dict:
    """Check and update expired subscriptions. Send notifications if needed."""
    async def _check():
        async with AsyncSessionLocal() as db:
            # Find subscriptions that are expiring soon or expired
            now = datetime.now(timezone.utc).replace(tzinfo=None)
            soon = now + timedelta(days=3)  # 3 days warning
            
            # Get active subscriptions
            result = await db.execute(
                select(Subscription).where(
                    Subscription.status == SubscriptionStatus.ACTIVE
                )
            )
            subscriptions = result.scalars().all()
            
            updated_count = 0
            notified_count = 0
            
            for subscription in subscriptions:
                should_update = False
                should_notify = False
                
                # Check if subscription is expired
                if subscription.end_date and subscription.end_date < now:
                    subscription.status = SubscriptionStatus.EXPIRED
                    should_update = True
                    should_notify = True
                # Check if subscription is expiring soon
                elif subscription.end_date and subscription.end_date < soon:
                    should_notify = True
                
                # Check if remaining classes are zero
                if subscription.remaining_classes <= 0:
                    if subscription.status == SubscriptionStatus.ACTIVE:
                        subscription.status = SubscriptionStatus.EXPIRED
                        should_update = True
                        should_notify = True
                
                if should_update:
                    subscription.updated_at = now
                    updated_count += 1
                
                if should_notify:
                    # Send notification (async via Celery)
                    message = f"Ваша подписка истекает или истекла. Осталось занятий: {subscription.remaining_classes}"
                    send_telegram_notification.delay(message)
                    notified_count += 1
            
            if updated_count > 0:
                await db.commit()
            
            return {
                "updated_subscriptions": updated_count,
                "notifications_sent": notified_count,
                "checked_at": now.isoformat(),
            }
    
    # Run async function - handle event loop properly for Celery
    import asyncio
    try:
        # Try to get existing event loop
        try:
            loop = asyncio.get_event_loop()
            if loop.is_closed():
                # Loop is closed, create a new one
                result = asyncio.run(_check())
            else:
                # Use existing loop
                result = loop.run_until_complete(_check())
        except RuntimeError:
            # No event loop exists, create one
            result = asyncio.run(_check())
        logger.info(f"Subscription check completed: {result}")
        return result
    except Exception as e:
        logger.error(f"Error checking subscriptions: {e}")
        return {"status": "error", "error": str(e)}

