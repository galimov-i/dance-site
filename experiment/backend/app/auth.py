from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config import settings
from app.models import User, RefreshToken
from app.schemas import TokenData
import secrets

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_access_token_expire_minutes)
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt


def create_refresh_token() -> str:
    """Create a secure random refresh token."""
    return secrets.token_urlsafe(64)


def decode_token(token: str) -> Optional[TokenData]:
    """Decode and verify a JWT token."""
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        if payload.get("type") != "access":
            return None
        email: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if email is None or user_id is None:
            return None
        return TokenData(email=email, user_id=user_id)
    except JWTError:
        return None


async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    """Get a user by email."""
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    """Get a user by ID."""
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create_refresh_token_record(
    db: AsyncSession, user_id: int, token: str, expires_at: datetime
) -> RefreshToken:
    """Create a refresh token record in the database."""
    db_token = RefreshToken(
        user_id=user_id,
        token=token,
        expires_at=expires_at
    )
    db.add(db_token)
    await db.commit()
    await db.refresh(db_token)
    return db_token


async def get_refresh_token(db: AsyncSession, token: str) -> Optional[RefreshToken]:
    """Get a refresh token record."""
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token == token)
    )
    return result.scalar_one_or_none()


async def revoke_refresh_token(db: AsyncSession, token: str) -> bool:
    """Revoke (delete) a refresh token."""
    db_token = await get_refresh_token(db, token)
    if db_token:
        await db.delete(db_token)
        await db.commit()
        return True
    return False


async def revoke_all_user_refresh_tokens(db: AsyncSession, user_id: int) -> None:
    """Revoke all refresh tokens for a user (for rotation)."""
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.user_id == user_id)
    )
    tokens = result.scalars().all()
    for token in tokens:
        await db.delete(token)
    await db.commit()

