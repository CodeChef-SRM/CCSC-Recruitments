import unittest
import requests


class TestAdminOnlyRoute(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.base_url = "http://localhost:8000"
        cls.client = requests.Session()
        cls.headers = {"Content-Type": "application/json"}

    def test_invalid_admin_route(self):
        response = self.client.get(self.base_url + "/review", headers=self.headers)
        self.assertEqual(response.status_code, 403)
