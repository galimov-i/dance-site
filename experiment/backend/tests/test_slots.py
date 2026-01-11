import pytest
from fastapi import status


@pytest.mark.asyncio
async def test_get_slots(client):
    """Test getting available slots."""
    response = client.get("/api/v1/slots")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "slots" in data
    assert "total_count" in data
    assert isinstance(data["slots"], list)


@pytest.mark.asyncio
async def test_get_slots_with_style_filter(client):
    """Test getting slots filtered by style."""
    response = client.get("/api/v1/slots?style=bachata")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "slots" in data

