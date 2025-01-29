import requests

BASE_URL = "http://localhost:5000/api"
HEADERS = {"Content-Type": "application/json"}
TOKEN = None


def register_user(name, email, password):
    url = f"{BASE_URL}/auth/register"
    data = {"name": name, "email": email, "password": password}
    response = requests.post(url, json=data, headers=HEADERS)
    return response.json()


def login_user(email, password):
    global TOKEN
    url = f"{BASE_URL}/auth/login"
    data = {"email": email, "password": password}
    response = requests.post(url, json=data, headers=HEADERS)

    if response.status_code == 200:
        TOKEN = response.json().get("token")
        if TOKEN:
            HEADERS["Authorization"] = f"Bearer {TOKEN}"
            print("Login successful! Token stored.")
        else:
            print("Error: No token received.")
    return response.json()


def get_tasks():
    url = f"{BASE_URL}/tasks"
    response = requests.get(url, headers=HEADERS)

    try:
        return response.json()
    except requests.exceptions.JSONDecodeError:
        return {"error": "Invalid JSON response from server"}


def create_task(title):
    url = f"{BASE_URL}/tasks"
    data = {"title": title}
    response = requests.post(url, json=data, headers=HEADERS)

    if response.status_code != 201:
        print("Error:", response.status_code, response.text)
        return {"error": "Failed to create task"}

    return response.json()


def update_task(task_id, title=None, completed=None):
    url = f"{BASE_URL}/tasks/{task_id}"
    data = {}
    if title:
        data["title"] = title
    if completed is not None:
        data["completed"] = completed

    response = requests.put(url, json=data, headers=HEADERS)
    return response.json()


def delete_task(task_id):
    url = f"{BASE_URL}/tasks/{task_id}"
    response = requests.delete(url, headers=HEADERS)
    return response.json()


if __name__ == "__main__":
    print("Registering user...")
    print(register_user("hello", "hello@example.com", "hello123"))

    print("\nLogging in...")
    print(login_user("hello@example.com", "hello123"))

    print("\nCreating a new task...")
    new_task = create_task("Learn FastAPI")
    print(new_task)

    if "_id" in new_task:
        task_id = new_task["_id"]

        print("\nGetting all tasks...")
        print(get_tasks())

        print("\nUpdating task...")
        print(update_task(task_id, title="Learn FastAPI and Flask", completed=True))

        print("\nDeleting task...")
        print(delete_task(task_id))


# task_manager_client.py
# import requests
# from typing import Optional, Dict, Any
# import json


# class TaskManagerClient:
#     def __init__(self, base_url: str = "http://localhost:5000/api"):
#         self.base_url = base_url
#         self.headers = {"Content-Type": "application/json"}
#         self.token = None

#     def _handle_response(self, response: requests.Response) -> Dict[str, Any]:
#         try:
#             if response.status_code == 204:
#                 return {"message": "Success"}
#             return response.json()
#         except json.JSONDecodeError:
#             return {"error": f"Invalid JSON response: {response.text}"}
#         except Exception as e:
#             return {"error": f"Request failed: {str(e)}"}

#     def register_user(self, name: str, email: str, password: str) -> Dict[str, Any]:
#         url = f"{self.base_url}/auth/register"
#         data = {"name": name, "email": email, "password": password}
#         response = requests.post(url, json=data, headers=self.headers)
#         return self._handle_response(response)

#     def login_user(self, email: str, password: str) -> Dict[str, Any]:
#         url = f"{self.base_url}/auth/login"
#         data = {"email": email, "password": password}
#         response = requests.post(url, json=data, headers=self.headers)

#         result = self._handle_response(response)
#         if response.status_code == 200 and "token" in result:
#             self.token = result["token"]
#             self.headers["Authorization"] = f"Bearer {self.token}"
#             print("Login successful! Token stored.")
#         return result

#     def get_tasks(self) -> Dict[str, Any]:
#         url = f"{self.base_url}/tasks"
#         response = requests.get(url, headers=self.headers)
#         return self._handle_response(response)

#     def create_task(self, title: str) -> Dict[str, Any]:
#         url = f"{self.base_url}/tasks"
#         data = {"title": title}
#         response = requests.post(url, json=data, headers=self.headers)
#         return self._handle_response(response)

#     def update_task(
#         self,
#         task_id: str,
#         title: Optional[str] = None,
#         completed: Optional[bool] = None,
#     ) -> Dict[str, Any]:
#         url = f"{self.base_url}/tasks/{task_id}"
#         data = {}
#         if title is not None:
#             data["title"] = title
#         if completed is not None:
#             data["completed"] = completed
#         response = requests.put(url, json=data, headers=self.headers)
#         return self._handle_response(response)

#     def delete_task(self, task_id: str) -> Dict[str, Any]:
#         url = f"{self.base_url}/tasks/{task_id}"
#         response = requests.delete(url, headers=self.headers)
#         return self._handle_response(response)


# if __name__ == "__main__":
#     client = TaskManagerClient()

#     # Test user registration and login
#     print("Testing new user registration...")
#     print(client.register_user("hi", "hi@example.com", "hi123"))

#     print("\nTesting login...")
#     print(client.login_user("hi@example.com", "hi123"))

#     # Test task operations
#     print("\nCreating a new task...")
#     task = client.create_task("Test Task")
#     print(task)

#     if "error" not in task:
#         task_id = task.get("_id")

#         print("\nGetting all tasks...")
#         print(client.get_tasks())

#         print("\nUpdating task...")
#         print(client.update_task(task_id, title="Updated Test Task", completed=True))

#         print("\nDeleting task...")
#         print(client.delete_task(task_id))
