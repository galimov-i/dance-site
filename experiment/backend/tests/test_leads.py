import pytest
from fastapi import status


@pytest.mark.asyncio
async def test_create_lead(client):
    """Test creating a lead."""
    response = client.post(
        "/api/v1/leads",
        json={
            "name": "John Doe",
            "phone": "+79161234567",
            "style": "bachata",
            "preferred_time": "Evening",
            "comment": "Interested in learning"
        }
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == "John Doe"
    assert data["phone"] == "+79161234567"
    assert data["style"] == "bachata"


@pytest.mark.asyncio
async def test_create_lead_minimal(client):
    """Test creating a lead with minimal data."""
    response = client.post(
        "/api/v1/leads",
        json={
            "name": "Jane Doe",
            "phone": "+79169876543"
        }
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == "Jane Doe"
    assert data["style"] is None


@pytest.mark.asyncio
async def test_get_lead(client):
    """Test getting a lead by ID."""
    # Create a lead
    create_response = client.post(
        "/api/v1/leads",
        json={
            "name": "John Doe",
            "phone": "+79161234567"
        }
    )
    lead_id = create_response.json()["id"]
    
    # Get the lead
    response = client.get(f"/api/v1/leads/{lead_id}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == lead_id
    assert data["name"] == "John Doe"


@pytest.mark.asyncio
async def test_get_nonexistent_lead(client):
    """Test getting a non-existent lead."""
    response = client.get("/api/v1/leads/99999")
    assert response.status_code == status.HTTP_404_NOT_FOUND

