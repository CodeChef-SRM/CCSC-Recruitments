import os
import requests

request = requests.Session()


def check_token(token) -> bool:
    """Check ReCaptcha token
    Args:
        token
    Returns:
        bool
    """

    if os.getenv("CI"):
        return True

    url = "https://www.google.com/recaptcha/api/siteverify"
    secret_key = os.getenv("RECAPTCHA_SECRET_KEY")

    payload = {
        "secret": secret_key,
        "response": token,
    }

    response = request.post(url, data=payload)
    return response.json()["success"] and response.json()["score"] >= 0.5
