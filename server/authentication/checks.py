from typing import Dict, Union
from authentication import auth_model
from core.errorfactory import AuthenticationError, ExistingUser


def insert_user(data: Dict[str, Union[str, int]]):
    try:
        auth_model.register_user(data)
    except ExistingUser as e:
        return e


def login(data: Dict[str, Union[str, int]]):
    try:
        return auth_model.login(data=data)
    except AuthenticationError as e:
        return str(e)
