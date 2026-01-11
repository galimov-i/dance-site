from celery import Celery
from app.config import settings

celery_app = Celery(
    "dance_coach",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Europe/Moscow",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
)

# Celery Beat schedule
celery_app.conf.beat_schedule = {
    "check-subscription-expiration": {
        "task": "app.tasks.check_subscription_expiration",
        "schedule": 3600.0,  # Every hour
    },
}

