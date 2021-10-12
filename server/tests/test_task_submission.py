import unittest
from .base import get_user, clear_all
import json
import requests


class TestSubmission(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.headers = {"Content-Type": "application/json"}
        cls.base_url = "http://localhost:8000"

    def setUp(self) -> None:
        clear_all()
        user = get_user()
        response = self.client.post(
            self.base_url + "/apis/register",
            data=json.dumps(user),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 201)

        login_data = {"email": user["email"], "password": user["password"]}
        response = self.client.post(
            self.base_url + "/apis/login",
            headers=self.headers,
            data=json.dumps(login_data),
        )
        self.access_token = response.json()["access_token"]
        registration_data = {
            "github_id": "Aradhya-Tripathi",
            "linkedin": "https://www.linkedin.com/in/aradhya-tripathi51/",
            "joining_details": "asssssssssssssssssssssssssssssssssslasmd;lmd;lamsd;malmsd;asmd",
            "reg_number": "RA1911004010185",
            "domain_details": {
                "tech": ["web", "app"],
                "non-tech": ["content", "design"],
            },
            "year": 2,
            "branch": "ECE",
        }
        headers = self.headers.copy()
        headers.update({"Authorization": f"Bearer {self.access_token}"})
        register_response = self.client.post(
            self.base_url + "/apis/registration-details",
            headers=headers,
            data=json.dumps(registration_data),
        )
        self.assertEqual(register_response.status_code, 201)

    def test_valid_submission(self):
        data = {"task_link": "https://github.com"}
        headers = self.headers.copy()
        headers["Authorization"] = f"Bearer {self.access_token}"
        response = self.client.post(
            self.base_url + "/apis/task-submission",
            headers=headers,
            params={"task": 1},
            data=json.dumps(data),
        )
        self.assertEqual(response.status_code, 201)

        response = self.client.post(
            self.base_url + "/apis/task-submission",
            headers=headers,
            params={"task": 2},
            data=json.dumps(data),
        )
        self.assertEqual(response.status_code, 201)

        response = self.client.post(
            self.base_url + "/apis/task-submission",
            headers=headers,
            params={"task": 3},
            data=json.dumps(data),
        )
        self.assertEqual(response.status_code, 201)

        data["task_link"] = "https://github.com/Aradhya-Tripathi"
        response = self.client.post(
            self.base_url + "/apis/task-submission",
            headers=headers,
            params={"task": 3},
            data=json.dumps(data),
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())

    def test_invalid_submission(self):
        data = {"task_link": "https://github.com"}
        headers = self.headers.copy()
        headers["Authorization"] = f"Bearer Invalid token"
        response = self.client.post(
            self.base_url + "/apis/task-submission",
            headers=headers,
            params={"task": 1},
            data=json.dumps(data),
        )

        self.assertEqual(response.status_code, 403)
        headers["Authorization"] = f"Bearer {self.access_token}"
        response = self.client.post(
            self.base_url + "/apis/task-submission",
            headers=headers,
            params={"task": 10},
            data=json.dumps(data),
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())

    def tearDown(self) -> None:
        clear_all()
