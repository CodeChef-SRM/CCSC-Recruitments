import unittest
import requests
from .base import get_user, clear_all
import json


class TestSubmissions(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.headers = {"Content-Type": "application/json"}
        cls.base_url = "http://localhost:8000"

        user = get_user()
        response = cls.client.post(
            cls.base_url + "/apis/register",
            headers=cls.headers,
            data=json.dumps(user),
        )
        login_data = {"email": user["email"], "password": user["password"]}
        response = cls.client.post(
            cls.base_url + "/apis/login",
            headers=cls.headers,
            data=json.dumps(login_data),
        )
        cls.access_token = response.json()["access_token"]

    def setUp(self) -> None:
        registration_data = {
            "github_id": "Aradhya-Tripathi",
            "joining_details": "asssssssssssssssssssssssssssssssssslasmd;lmd;lamsd;malmsd;asmd",
            "linkedin": "https://linkedin.com",
            "reg_number": "RA1911004010187",
            "domain_details": {"tech": ["web", "app"], "corp": ["manage"]},
            "year": "2",
            "branch": "ECE",
        }
        headers = self.headers.copy()
        headers.update({"Authorization": f"Bearer {self.access_token}"})
        registration_response = self.client.post(
            self.base_url + "/apis/registration-details",
            data=json.dumps(registration_data),
            headers=headers,
        )
        self.assertEqual(registration_response.status_code, 201)

    def test_valid_task_submission(self):
        data = {
            "task_link": "https://github.com",
            "domain": "tech",
            "sub_domain": "web",
        }
        headers = self.headers.copy()
        headers.update({"Authorization": f"Bearer {self.access_token}"})
        submission_response_1 = self.client.post(
            self.base_url + "/apis/task-submission",
            data=json.dumps(data),
            headers=headers,
            params={"task": 1},
        )
        submission_response_2 = self.client.post(
            self.base_url + "/apis/task-submission",
            data=json.dumps(data),
            headers=headers,
            params={"task": 3},
        )
        self.assertEqual(submission_response_1.status_code, 201)
        self.assertEqual(submission_response_2.status_code, 201)

        submission_response = self.client.post(
            self.base_url + "/apis/task-submission",
            data=json.dumps(data),
            headers=headers,
            params={"task": 1},
        )

        self.assertEqual(submission_response.status_code, 400)
        self.assertEqual(
            "Submissions exists for user", submission_response.json()["error"]
        )

    def test_invalid_task_submission(self):
        data = {
            "task_link": "https://github.com",
            "domain": "creat",
            "sub_domain": "manage",
        }
        headers = self.headers.copy()
        headers.update({"Authorization": f"Bearer {self.access_token}"})
        submission_response = self.client.post(
            self.base_url + "/apis/task-submission",
            data=json.dumps(data),
            headers=headers,
            params={"task": 1},
        )
        self.assertEqual(submission_response.status_code, 400)
        self.assertEqual(
            "User ins't eligible for this task", submission_response.json()["error"]
        )

    def tearDown(self) -> None:
        clear_all(TaskSubmissions=True, RegistrationDetails=True)

    @classmethod
    def tearDownClass(cls) -> None:
        clear_all()
