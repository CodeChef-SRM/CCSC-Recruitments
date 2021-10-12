import unittest
import requests
from .base import get_user, clear_all
import json


class TestAuthentication(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.headers = {"Content-Type": "application/json"}
        cls.base_url = "http://localhost:8000"

    def setUp(self) -> None:
        clear_all()

    def tearDown(self) -> None:
        clear_all()

    def test_register(self):
        user = get_user()
        response = self.client.post(
            self.base_url + "/apis/register",
            headers=self.headers,
            data=json.dumps(user),
        )
        self.assertEqual(response.status_code, 201)

        response = self.client.post(
            self.base_url + "/apis/register",
            headers=self.headers,
            data=json.dumps(user),
        )

        self.assertEqual(response.status_code, 409)

    def test_login(self):
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

        self.assertEqual(response.status_code, 200)
        self.assertIn("access_token", response.json())
        self.assertIn("refresh_token", response.json())

    def test_me_verification(self):
        user = get_user()
        status = self.client.get(self.base_url + "/me")
        self.assertEqual(status.status_code, 403)

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
        headers.update({"Authorization": f"Bearer {access_token}"})
        status = self.client.get(self.base_url + "/me", headers=headers)
        self.assertEqual(status.status_code, 200)
        self.assertIn("user", status.json())
        self.assertIn("email", status.json())
