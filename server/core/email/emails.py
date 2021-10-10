import os
import smtplib
import json
from email.message import EmailMessage
from jinja2 import Template


class Service:
    def __init__(self):
        self.client = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        self.client.login(os.getenv("EMAIL_ADDR"), os.getenv("EMAIL_PASSWD"))

    def send_mail(self, email_id: str, email_type: str, **kwargs):
        """Send email to users with appropriate templates
           using smtp.

        Args:
            email_id (str): `To`
            email_type (str): Template to select
        """
        message = EmailMessage()
        message["From"] = os.getenv("EMAIL_ADDR")
        with open("./core/email/email_config.json") as f:
            f = json.loads(f.read())

        with open(f[email_type]) as _file:
            template = Template(_file.read())
            html = template.render(**kwargs)

        message.add_alternative(html, subtype="html")
        message["To"] = email_id
        if os.getenv("CI"):
            return
        self.client.send_message(message)
