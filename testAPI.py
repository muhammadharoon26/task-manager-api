import requests
import pytest

BASE_URL = (
    "http://localhost:5000/api"  # Adjust the URL based on your app's configuration
)


@pytest.fixture
def register_user():
    """Fixture to register a new user"""
    response = requests.post(
        f"{BASE_URL}/auth/register",
        json={
            "name": "Test User",
            "email": "haroon@example.com",
            "password": "word123",
        },
    )
    print(
        f"Registration response: {response.status_code} - {response.text}"
    )  # Debugging line
    assert response.status_code == 201
    return response.json()


@pytest.fixture
def login_user():
    """Fixture to log in and get the token"""
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": "test@example.com", "password": "password123"},
    )
    print(f"Login response: {response.status_code} - {response.text}")  # Debugging line
    assert response.status_code == 200
    return response.json()["token"]


def test_register_user(register_user):
    """Test to ensure the user is registered successfully"""
    assert register_user["email"] == "test@example.com"
    assert register_user["name"] == "Test User"


def test_login_user(login_user):
    """Test to ensure login returns a token"""
    assert login_user is not None


def test_fetch_tasks_with_token(login_user):
    """Test to fetch tasks using the login token"""
    headers = {"Authorization": f"Bearer {login_user}"}
    response = requests.get(f"{BASE_URL}/tasks", headers=headers)
    print(
        f"Fetch tasks response: {response.status_code} - {response.text}"
    )  # Debugging line
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_fetch_tasks_without_token():
    """Test to fetch tasks without token (should be unauthorized)"""
    response = requests.get(f"{BASE_URL}/tasks")
    print(
        f"Unauthorized fetch tasks response: {response.status_code} - {response.text}"
    )  # Debugging line
    assert response.status_code == 401
