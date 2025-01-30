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
    else:
        print("Login failed:", response.json())
    return response.json()


def get_tasks():
    url = f"{BASE_URL}/tasks"
    response = requests.get(url, headers=HEADERS)
    try:
        return response.json()
    except requests.exceptions.JSONDecodeError:
        return {"error": "Invalid JSON response from server"}


# def create_task(title):
#     url = f"{BASE_URL}/tasks"
#     data = {"title": title}
#     response = requests.post(url, json=data, headers=HEADERS)

#     if response.status_code != 201:
#         print("Error:", response.status_code, response.text)
#         return {"error": "Failed to create task"}

#     return response.json()


def create_task(title):
    url = f"{BASE_URL}/tasks"
    data = {"title": title}

    # Debug: Print the token being used
    print("Using token:", HEADERS.get("Authorization"))

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
    print(register_user("asd", "asd@example.com", "asd123"))

    print("\nLogging in...")
    print(login_user("asd@example.com", "asd123"))

    print("\nCreating a new task...")
    new_task = create_task("Learn FastAPI now")
    print(new_task)

    if "_id" in new_task:
        task_id = new_task["_id"]

        print("\nGetting all tasks...")
        print(get_tasks())

        print("\nUpdating task...")
        print(update_task(task_id, title="Learn", completed=False))

        print("\nGetting all tasks...")
        print(get_tasks())

        # print("\nDeleting task...")
        # print(delete_task(task_id))
