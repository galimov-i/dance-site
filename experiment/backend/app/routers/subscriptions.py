from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models import Subscription, Transaction, User
from app.schemas import (
    SubscriptionCreate, SubscriptionResponse, SubscriptionUpdate,
    TransactionCreate, TransactionResponse
)
from app.routers.auth import get_current_user
from datetime import datetime, timezone

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.post("", response_model=SubscriptionResponse, status_code=status.HTTP_201_CREATED)
async def create_subscription(
    subscription_data: SubscriptionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new subscription for the current user."""
    # Determine class counts based on subscription type
    class_counts = {
        "single": 1,
        "pack_5": 5,
        "pack_10": 10,
        "monthly": 8,  # Example: 8 classes per month
        "yearly": 96,  # Example: 96 classes per year
    }
    
    total_classes = class_counts.get(subscription_data.type.value, 1)
    
    # Determine end date based on type
    end_date = None
    if subscription_data.type.value in ["monthly", "yearly"]:
        months = 1 if subscription_data.type.value == "monthly" else 12
        from datetime import timedelta
        # Approximate: use 30 days per month
        days = months * 30
        end_date = subscription_data.start_date + timedelta(days=days)
    
    new_subscription = Subscription(
        user_id=current_user.id,
        type=subscription_data.type,
        start_date=subscription_data.start_date,
        end_date=end_date,
        remaining_classes=total_classes,
        total_classes=total_classes,
    )
    
    db.add(new_subscription)
    await db.commit()
    await db.refresh(new_subscription)
    
    return new_subscription


@router.get("/me", response_model=list[SubscriptionResponse])
async def get_my_subscriptions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all subscriptions for the current user."""
    result = await db.execute(
        select(Subscription).where(Subscription.user_id == current_user.id)
    )
    subscriptions = result.scalars().all()
    return subscriptions


@router.get("/{subscription_id}", response_model=SubscriptionResponse)
async def get_subscription(
    subscription_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get a specific subscription."""
    subscription = await db.get(Subscription, subscription_id)
    
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found"
        )
    
    if subscription.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this subscription"
        )
    
    return subscription


@router.patch("/{subscription_id}", response_model=SubscriptionResponse)
async def update_subscription(
    subscription_id: int,
    subscription_update: SubscriptionUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update a subscription (admin or owner)."""
    subscription = await db.get(Subscription, subscription_id)
    
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found"
        )
    
    if subscription.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this subscription"
        )
    
    if subscription_update.status is not None:
        subscription.status = subscription_update.status
    if subscription_update.remaining_classes is not None:
        subscription.remaining_classes = subscription_update.remaining_classes
    
    subscription.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(subscription)
    
    return subscription


@router.post("/transactions", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
async def create_transaction(
    transaction_data: TransactionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a transaction record."""
    new_transaction = Transaction(
        user_id=current_user.id,
        amount=transaction_data.amount,
        currency=transaction_data.currency,
        type=transaction_data.type,
        metadata=transaction_data.metadata,
    )
    
    db.add(new_transaction)
    await db.commit()
    await db.refresh(new_transaction)
    
    return new_transaction


@router.get("/transactions/me", response_model=list[TransactionResponse])
async def get_my_transactions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all transactions for the current user."""
    result = await db.execute(
        select(Transaction).where(Transaction.user_id == current_user.id)
    )
    transactions = result.scalars().all()
    return transactions

