import unittest
import requests
from .base import get_user, clear_all
import json


class TestRegistration(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.base_url = "http://localhost:8000"
        cls.headers = {"Content-Type": "application/json"}

    def setUp(self) -> None:
        clear_all()

    def tearDown(self) -> None:
        clear_all()

    def test_registration(self):
        user = get_user()
        response = self.client.post(
            self.base_url + "/apis/register",
            headers=self.headers,
            data=json.dumps(user),
        )
        self.assertEqual(response.status_code, 201)

        login_data = {"email": user["email"], "password": user["password"]}
        response = self.client.post(
            self.base_url + "/apis/login",
            headers=self.headers,
            data=json.dumps(login_data),
        )

        access_token = response.json()["access_token"]

        registration_data = {
            "github_id": "https://github.com/Aradhya-Tripathi",
            "linkedin": "https://www.linkedin.com/in/aradhya-tripathi51/",
            "joining_details": "asssssssssssssssssssssssssssssssssslasmd;lmd;lamsd;malmsd;asmd",
            "reg_number": "RA1911004010185",
            "domain_details": {
                "tech": ["web"],
                "non-tech": ["content", "design"],
            },
            "year": "2",
            "branch": "ECE",
        }

        headers = self.headers.copy()
        headers.update({"Authorization": f"Bearer {access_token}"})
        register_response = self.client.post(
            self.base_url + "/apis/registration-details",
            headers=headers,
            data=json.dumps(registration_data),
        )

        self.assertEqual(register_response.status_code, 201)
        invalid_register_response = self.client.post(
            self.base_url + "/apis/registration-details",
            headers=headers,
            data=json.dumps(registration_data),
        )
        self.assertEqual(invalid_register_response.status_code, 409)
        domain_response = self.client.get(
            self.base_url + "/apis/domain-details", headers=headers
        )
        expected_response = {
            **registration_data["domain_details"],
            **{"instruction": ["Instructions"]},
        }
        self.assertEqual(domain_response.json(), expected_response)
        attempt_domains = self.client.get(
            self.base_url + "/apis/domain-details",
            headers={"Content-Type": "application/json"},
        )
        self.assertEqual(attempt_domains.status_code, 403)

    def test_non_tech_register(self):
        user = get_user()
        response = self.client.post(
            self.base_url + "/apis/register",
            headers=self.headers,
            data=json.dumps(user),
        )
        self.assertEqual(response.status_code, 201)

        login_data = {"email": user["email"], "password": user["password"]}
        response = self.client.post(
            self.base_url + "/apis/login",
            headers=self.headers,
            data=json.dumps(login_data),
        )

        access_token = response.json()["access_token"]
        registration_data = {
            "github_id": "",
            "linkedin": "https://www.linkedin.com/in/aradhya-tripathi51/",
            "joining_details": "asssssssssssssssssssssssssssssssssslasmd;lmd;lamsd;malmsd;asmd",
            "reg_number": "RA1911004010185",
            "domain_details": {
                "tech": ["web"],
                "non-tech": ["content", "design"],
            },
            "year": "1",
            "branch": "ECE",
        }
        headers = self.headers.copy()
        headers.update({"Authorization": f"Bearer {access_token}"})
        register_response = self.client.post(
            self.base_url + "/apis/registration-details",
            headers=headers,
            data=json.dumps(registration_data),
        )
        self.assertEqual(register_response.status_code, 201)

    def test_forbidden_upload(self):
        user = get_user()
        response = self.client.post(
            self.base_url + "/apis/register",
            headers=self.headers,
            data=json.dumps(user),
        )
        self.assertEqual(response.status_code, 201)

        login_data = {"email": user["email"], "password": user["password"]}
        response = self.client.post(
            self.base_url + "/apis/login",
            headers=self.headers,
            data=json.dumps(login_data),
        )

        access_token = response.json()["access_token"]
        headers = self.headers.copy()
        headers.update({"Authorization": "Bearer"})
        registration_data = {
            "github_id": "Aradhya-Tripathi",
            "linkedin": "https://www.linkedin.com/in/aradhya-tripathi51/",
            "joining_details": "asssssssssssssssssssssssssssssssssslasmd;lmd;lamsd;malmsd;asmd",
            "reg_number": "RA1911004010185",
            "domain_details": {
                "tech": ["web"],
                "non-tech": ["content", "design"],
            },
            "year": "2",
            "branch": "ECE",
        }
        invalid_register_response = self.client.post(
            self.base_url + "/apis/registration-details",
            headers=headers,
            data=json.dumps(registration_data),
        )
        self.assertEqual(invalid_register_response.status_code, 403)
