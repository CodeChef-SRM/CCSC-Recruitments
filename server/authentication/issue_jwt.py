from typing import Union, Dict
import jwt
import os

from dotenv import load_dotenv

load_dotenv()


class TokenAuth:
    def __init__(self, *args, **kwargs):
        if os.getenv("CI"):
            self.signature = "random"
        else:
            self.signature = os.getenv("SECRET_KEY")

    def generate_key(
        self,
        payload: Dict[str, Union[str, int]],
        expiry: int = 24,
        get_refresh: bool = False,
        hours: bool = True,
        **kwargs,
    ):
        from datetime import timedelta, datetime

        current_time = datetime.utcnow()
        if hours:
            payload["exp"] = current_time + timedelta(hours=expiry)
        else:
            payload["exp"] = current_time + timedelta(minutes=expiry)
        access_token = jwt.encode(payload, key=self.signature)

        if get_refresh:
            if value := kwargs.get("refresh_exipry"):
                payload["exp"] = current_time + timedelta(seconds=value)
            refresh_payload = {**{"refresh": True}, **payload}
            refresh_token = jwt.encode(refresh_payload, key=self.signature)
            return {"access_token": access_token, "refresh_token": refresh_token}

        return access_token

    def verify_key(self, key: str):
        def _verify_key(key: str):
            try:
                key = jwt.decode(
                    jwt=key.encode(),
                    key=self.signature,
                    options={"verify_exp": True, "verify_signature": True},
                    algorithms=["HS256"],
                )
                return key
            except Exception:
                return None

        return _verify_key(key=key)
