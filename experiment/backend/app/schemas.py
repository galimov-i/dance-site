from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import datetime
from app.models import (
    DanceStyle, SubscriptionType, SubscriptionStatus,
    TransactionType, TransactionStatus, UserRole
)
import bleach
import phonenumbers


def sanitize_html(text: str) -> str:
    """Sanitize HTML to prevent XSS attacks."""
    if not text:
        return text
    return bleach.clean(text, tags=[], strip=True)


def validate_phone(phone: str) -> str:
    """Validate and normalize phone number."""
    try:
        # Try to parse as Russian phone number
        parsed = phonenumbers.parse(phone, "RU")
        if phonenumbers.is_valid_number(parsed):
            return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
        else:
            raise ValueError("Invalid phone number")
    except Exception:
        # Fallback: basic validation
        cleaned = "".join(filter(str.isdigit, phone))
        if len(cleaned) >= 10:
            return f"+7{cleaned[-10:]}"  # Default to Russia
        raise ValueError("Invalid phone number format")


# Auth Schemas
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None


class UserCreate(BaseModel):
    email: EmailStr
    phone: str
    name: str = Field(..., min_length=1, max_length=255)
    password: str = Field(..., min_length=8)

    @field_validator("phone")
    @classmethod
    def validate_phone_number(cls, v: str) -> str:
        return validate_phone(v)

    @field_validator("name")
    @classmethod
    def sanitize_name(cls, v: str) -> str:
        return sanitize_html(v)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    phone: str
    name: str
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class RefreshTokenRequest(BaseModel):
    refresh_token: str


# Lead Schemas
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    phone: str
    style: Optional[DanceStyle] = None
    preferred_time: Optional[str] = Field(None, max_length=100)
    comment: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def validate_phone_number(cls, v: str) -> str:
        return validate_phone(v)

    @field_validator("name", "preferred_time", "comment")
    @classmethod
    def sanitize_text_fields(cls, v: Optional[str]) -> Optional[str]:
        if v:
            return sanitize_html(v)
        return v


class LeadResponse(BaseModel):
    id: int
    name: str
    phone: str
    style: Optional[DanceStyle]
    preferred_time: Optional[str]
    comment: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# Slot Schemas
class TimeSlot(BaseModel):
    date: str  # ISO format date string
    start_time: str  # ISO format datetime string
    end_time: str  # ISO format datetime string
    style: Optional[DanceStyle] = None
    is_available: bool = True


class SlotResponse(BaseModel):
    slots: List[TimeSlot]
    total_count: int


# Subscription Schemas
class SubscriptionCreate(BaseModel):
    type: SubscriptionType
    start_date: datetime


class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    type: SubscriptionType
    status: SubscriptionStatus
    start_date: datetime
    end_date: Optional[datetime]
    remaining_classes: int
    total_classes: int
    created_at: datetime

    class Config:
        from_attributes = True


class SubscriptionUpdate(BaseModel):
    status: Optional[SubscriptionStatus] = None
    remaining_classes: Optional[int] = None


# Transaction Schemas
class TransactionCreate(BaseModel):
    amount: float
    currency: str = "RUB"
    type: TransactionType
    metadata: Optional[dict] = None


class TransactionResponse(BaseModel):
    id: int
    user_id: int
    amount: float
    currency: str
    type: TransactionType
    status: TransactionStatus
    metadata: Optional[dict]
    created_at: datetime

    class Config:
        from_attributes = True


# Blog Schemas
class BlogPostCreate(BaseModel):
    slug: str = Field(..., min_length=1, max_length=255)
    title: str = Field(..., min_length=1, max_length=500)
    content: str
    excerpt: Optional[str] = None
    meta_title: Optional[str] = Field(None, max_length=255)
    meta_description: Optional[str] = Field(None, max_length=500)
    is_published: bool = False

    @field_validator("slug", "title", "excerpt", "meta_title", "meta_description")
    @classmethod
    def sanitize_text(cls, v: Optional[str]) -> Optional[str]:
        if v:
            return sanitize_html(v)
        return v


class BlogPostUpdate(BaseModel):
    slug: Optional[str] = Field(None, min_length=1, max_length=255)
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    content: Optional[str] = None
    excerpt: Optional[str] = None
    meta_title: Optional[str] = Field(None, max_length=255)
    meta_description: Optional[str] = Field(None, max_length=500)
    is_published: Optional[bool] = None

    @field_validator("slug", "title", "excerpt", "meta_title", "meta_description")
    @classmethod
    def sanitize_text(cls, v: Optional[str]) -> Optional[str]:
        if v:
            return sanitize_html(v)
        return v


class BlogPostResponse(BaseModel):
    id: int
    slug: str
    title: str
    content: str
    excerpt: Optional[str]
    meta_title: Optional[str]
    meta_description: Optional[str]
    is_published: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BlogPostListResponse(BaseModel):
    posts: List[BlogPostResponse]
    total: int
    page: int
    page_size: int


# Lesson Schemas
class LessonResponse(BaseModel):
    id: int
    user_id: int
    style: DanceStyle
    start_time: datetime
    end_time: datetime
    is_attended: bool
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

