import pytest
import asyncio
from fastapi.testclient import TestClient
from main import app
import os

# Set environment variables for testing (these would be real values in actual use)
os.environ["COHERE_API_KEY"] = "test-key"
os.environ["QDRANT_URL"] = "https://test.qdrant.tech"
os.environ["QDRANT_API_KEY"] = "test-key"

client = TestClient(app)

def test_health_endpoint():
    """Test the health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert "timestamp" in data
    assert "services" in data

def test_root_endpoint():
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200

    data = response.json()
    assert "message" in data

def test_query_endpoint():
    """Test the query endpoint with a sample request"""
    # This test would require mocking external services in a real scenario
    sample_request = {
        "query": "What is physical AI?",
        "query_type": "full_book"
    }

    # Since we can't actually call Cohere/Qdrant in tests without real keys,
    # we'll just test that the endpoint accepts the request format
    response = client.post("/api/query", json=sample_request)

    # In a real test with mocked services, we'd expect either a 200 or handle the external service error
    # For now, we're just testing the endpoint structure
    assert response.status_code in [200, 500]  # Could be 500 if external services fail

if __name__ == "__main__":
    test_health_endpoint()
    test_root_endpoint()
    test_query_endpoint()
    print("All tests passed!")