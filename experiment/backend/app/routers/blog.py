from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from datetime import datetime
from app.database import get_db
from app.models import BlogPost
from app.schemas import (
    BlogPostCreate, BlogPostUpdate, BlogPostResponse, BlogPostListResponse
)
from app.routers.auth import get_current_user
from app.models import User

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("", response_model=BlogPostListResponse)
async def get_blog_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    published_only: bool = Query(True),
    db: AsyncSession = Depends(get_db)
):
    """Get list of blog posts with pagination."""
    query = select(BlogPost)
    
    if published_only:
        query = query.where(BlogPost.is_published == True)
    
    # Get total count
    count_query = select(func.count()).select_from(BlogPost)
    if published_only:
        count_query = count_query.where(BlogPost.is_published == True)
    
    total_result = await db.execute(count_query)
    total = total_result.scalar()
    
    # Get paginated posts
    offset = (page - 1) * page_size
    query = query.order_by(BlogPost.created_at.desc()).offset(offset).limit(page_size)
    
    result = await db.execute(query)
    posts = result.scalars().all()
    
    return BlogPostListResponse(
        posts=posts,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{slug}", response_model=BlogPostResponse)
async def get_blog_post(
    slug: str,
    db: AsyncSession = Depends(get_db)
):
    """Get a blog post by slug."""
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug))
    post = result.scalar_one_or_none()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    if not post.is_published:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    return post


@router.post("", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_blog_post(
    post_data: BlogPostCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new blog post (admin only)."""
    # Check if user is admin (simple check, can be enhanced)
    if current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create blog posts"
        )
    
    # Check if slug already exists
    result = await db.execute(select(BlogPost).where(BlogPost.slug == post_data.slug))
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Blog post with this slug already exists"
        )
    
    new_post = BlogPost(
        slug=post_data.slug,
        title=post_data.title,
        content=post_data.content,
        excerpt=post_data.excerpt,
        meta_title=post_data.meta_title,
        meta_description=post_data.meta_description,
        is_published=post_data.is_published,
        published_at=datetime.now(timezone.utc) if post_data.is_published else None,
    )
    
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    
    return new_post


@router.patch("/{slug}", response_model=BlogPostResponse)
async def update_blog_post(
    slug: str,
    post_update: BlogPostUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update a blog post (admin only)."""
    if current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can update blog posts"
        )
    
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug))
    post = result.scalar_one_or_none()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Update fields
    if post_update.slug is not None:
        # Check if new slug exists (and is not the current post)
        if post_update.slug != slug:
            existing = await db.execute(
                select(BlogPost).where(BlogPost.slug == post_update.slug)
            )
            if existing.scalar_one_or_none():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Blog post with this slug already exists"
                )
        post.slug = post_update.slug
    
    if post_update.title is not None:
        post.title = post_update.title
    if post_update.content is not None:
        post.content = post_update.content
    if post_update.excerpt is not None:
        post.excerpt = post_update.excerpt
    if post_update.meta_title is not None:
        post.meta_title = post_update.meta_title
    if post_update.meta_description is not None:
        post.meta_description = post_update.meta_description
        if post_update.is_published is not None:
            post.is_published = post_update.is_published
            if post_update.is_published and not post.published_at:
                post.published_at = datetime.now(timezone.utc)
    
    await db.commit()
    await db.refresh(post)
    
    return post


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog_post(
    slug: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a blog post (admin only)."""
    if current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete blog posts"
        )
    
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug))
    post = result.scalar_one_or_none()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    await db.delete(post)
    await db.commit()
    
    return None

