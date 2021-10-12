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

        self.access_token = response.json()["access_token"]

    def tearDown(self) -> None:
        clear_all()

    def test_registration(self):

        registration_data = {
            "github_id": "Aradhya-Tripathi",
            "linkedin": "https://www.linkedin.com/in/aradhya-tripathi51/",
            "joining_details": "asssssssssssssssssssssssssssssssssslasmd;lmd;lamsd;malmsd;asmd",
            "reg_number": "RA1911004010185",
        }

        headers = self.headers.copy()
        headers.update({"Authorization": f"Bearer {self.access_token}"})
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

    def test_forbidden_upload(self):
        headers = self.headers.copy()
        headers.update({"Authorization": "Bearer"})
        registration_data = {
            "github_id": "Aradhya-Tripathi",
            "linkedin": "https://www.linkedin.com/in/aradhya-tripathi51/",
            "joining_details": "asssssssssssssssssssssssssssssssssslasmd;lmd;lamsd;malmsd;asmd",
            "reg_number": "RA1911004010185",
        }
        invalid_register_response = self.client.post(
            self.base_url + "/apis/registration-details",
            headers=headers,
            data=json.dumps(registration_data),
        )
        self.assertEqual(invalid_register_response.status_code, 403)
