import os
import requests

request = requests.Session()


def check_token(token) -> bool:
    """Check ReCaptcha token
    Args:
        token: Sent though client
    Returns:
        bool
    """
    url = "https://www.google.com/recaptcha/api/siteverify"
    secret_key = os.getenv("RECAPTCHA_SECRET_KEY")
    payload = {
        "secret": secret_key,
        "response": token,
    }
    response = request.post(url, data=payload)
    return response.json()["success"]
