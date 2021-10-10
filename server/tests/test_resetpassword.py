import unittest
import json
from .base import get_user, clear_all
import requests


class TestResetPassword(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.base_url = "http://localhost:8000"
        cls.headers = {"Content-Type": "application/json"}

    def test_reset_password(self):
        user = get_user()
        response = self.client.post(
            self.base_url + "/apis/register",
            data=json.dumps(user),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 201)
        data = {"email": user["email"]}
        response = self.client.post(
            self.base_url + "/apis/forgot-password",
            data=json.dumps(data),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 200)

        data["email"] = "exampleuser@srmist.edu.in"
        response = self.client.post(
            self.base_url + "/apis/forgot-password",
            data=json.dumps(data),
            headers=self.headers,
        )
        self.assertEqual(response.status_code, 200)

    def tearDown(self) -> None:
        clear_all()
