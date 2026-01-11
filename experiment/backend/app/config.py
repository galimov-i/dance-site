from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    database_url: str
    postgres_user: str = "dance_user"
    postgres_password: str = "dance_password"
    postgres_db: str = "dance_db"

    # Redis
    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/0"

    # JWT
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7

    # Telegram
    telegram_bot_token: Optional[str] = None
    telegram_chat_id: Optional[str] = None

    # Google Calendar
    google_service_account_file: Optional[str] = None
    google_calendar_id: Optional[str] = None

    # SMS (optional)
    sms_provider_api_key: Optional[str] = None
    sms_provider_api_url: Optional[str] = None

    # Environment
    environment: str = "development"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

