import os
import json
import requests
from jinja2 import Template
from typing import Union, List


class Service:
    def __init__(self):
        self.client = requests.Session()
        self.base_url = os.getenv("MAILGUN_BASE_URL")
        self.auth = ("api", os.getenv("MAILGUN_API_KEY"))

    def send_mail(self, email_id: Union[str, List[str]], email_type: str, **kwargs):
        """Send email to users with appropriate templates
           using smtp.

        Args:
            email_id (str): `To`
            email_type (str): Template to select
        """
        with open("./core/email/email_config.json") as f:
            f = json.loads(f.read())

        with open(f[email_type]["html"]) as _file:
            template = Template(_file.read())
            html = template.render(**kwargs)

        if os.getenv("CI"):
            print("NOT SENDING EMAILS...")
            return

        if isinstance(email_id, str):
            email_id = [email_id]

        data = {
            "from": "CodeChefSRM <codechefsrm@gmail.com>",
            "to": email_id,
            "subject": f[email_type]["subject"],
            "html": html,
        }
        response = self.client.post(url=self.base_url, auth=self.auth, data=data)
        return response
