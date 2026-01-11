import pytest
from fastapi import status
from app.models import User


@pytest.mark.asyncio
async def test_register_user(client):
    """Test user registration."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "phone": "+79161234567",
            "name": "Test User",
            "password": "testpassword123"
        }
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["name"] == "Test User"
    assert "password_hash" not in data


@pytest.mark.asyncio
async def test_register_duplicate_email(client):
    """Test registration with duplicate email."""
    # Register first user
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "phone": "+79161234567",
            "name": "Test User",
            "password": "testpassword123"
        }
    )
    
    # Try to register again with same email
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "phone": "+79169876543",
            "name": "Another User",
            "password": "testpassword123"
        }
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.asyncio
async def test_login_success(client):
    """Test successful login."""
    # Register user
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "phone": "+79161234567",
            "name": "Test User",
            "password": "testpassword123"
        }
    )
    
    # Login
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "test@example.com",
            "password": "testpassword123"
        }
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_login_wrong_password(client):
    """Test login with wrong password."""
    # Register user
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "phone": "+79161234567",
            "name": "Test User",
            "password": "testpassword123"
        }
    )
    
    # Try to login with wrong password
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "test@example.com",
            "password": "wrongpassword"
        }
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.asyncio
async def test_get_current_user(client):
    """Test getting current user info."""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "phone": "+79161234567",
            "name": "Test User",
            "password": "testpassword123"
        }
    )
    
    login_response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "test@example.com",
            "password": "testpassword123"
        }
    )
    token = login_response.json()["access_token"]
    
    # Get current user
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_refresh_token(client):
    """Test token refresh."""
    # Register and login
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "phone": "+79161234567",
            "name": "Test User",
            "password": "testpassword123"
        }
    )
    
    login_response = client.post(
        "/api/v1/auth/login",
        data={
            "username": "test@example.com",
            "password": "testpassword123"
        }
    )
    refresh_token = login_response.json()["refresh_token"]
    
    # Refresh token
    response = client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": refresh_token}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data

