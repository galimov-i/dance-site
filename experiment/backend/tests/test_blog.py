import pytest
from fastapi import status
from app.models import User
from app.auth import get_password_hash


@pytest.fixture
def admin_user(client, db_session):
    """Create an admin user for testing."""
    # Note: This is a simplified approach. In production, you'd use proper fixtures
    pass


@pytest.mark.asyncio
async def test_get_blog_posts_empty(client):
    """Test getting blog posts when there are none."""
    response = client.get("/api/v1/blog?published_only=true")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["total"] == 0
    assert data["posts"] == []


@pytest.mark.asyncio
async def test_get_nonexistent_blog_post(client):
    """Test getting a non-existent blog post."""
    response = client.get("/api/v1/blog/nonexistent-slug")
    assert response.status_code == status.HTTP_404_NOT_FOUND

