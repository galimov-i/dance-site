from app.celery_app import celery_app
from app.config import settings
import httpx
import logging

logger = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.send_telegram_notification")
def send_telegram_notification(message: str) -> dict:
    """Send notification to Telegram."""
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Telegram credentials not configured")
        return {"status": "skipped", "reason": "not_configured"}

    try:
        url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
        data = {
            "chat_id": settings.telegram_chat_id,
            "text": message,
            "parse_mode": "HTML",
        }
        
        response = httpx.post(url, json=data, timeout=10)
        response.raise_for_status()
        
        logger.info(f"Telegram notification sent successfully")
        return {"status": "success", "response": response.json()}
    except Exception as e:
        logger.error(f"Failed to send Telegram notification: {e}")
        return {"status": "error", "error": str(e)}


@celery_app.task(name="app.tasks.send_sms_notification")
def send_sms_notification(phone: str, message: str) -> dict:
    """Send SMS notification (abstracted for future provider integration)."""
    if not settings.sms_provider_api_key or not settings.sms_provider_api_url:
        logger.warning("SMS provider not configured")
        return {"status": "skipped", "reason": "not_configured"}

    try:
        # Placeholder for SMS provider integration
        # Replace with actual SMS provider API call
        # Example structure:
        # url = settings.sms_provider_api_url
        # headers = {"Authorization": f"Bearer {settings.sms_provider_api_key}"}
        # data = {"phone": phone, "message": message}
        # response = httpx.post(url, headers=headers, json=data, timeout=10)
        # response.raise_for_status()
        
        logger.info(f"SMS notification would be sent to {phone}")
        return {"status": "success", "message": "SMS provider integration pending"}
    except Exception as e:
        logger.error(f"Failed to send SMS notification: {e}")
        return {"status": "error", "error": str(e)}

