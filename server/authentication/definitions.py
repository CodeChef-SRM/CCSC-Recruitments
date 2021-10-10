from typing import Union, Dict
from schema import Schema, SchemaError, And


def authentication_schema(data: Dict[str, Union[str, int]], **kwargs):
    register = {
        "name": And(str, lambda name: len(name.strip()) > 0),
        "email": And(str, lambda email: email.endswith("srmist.edu.in")),
        "password": And(str, lambda password: len(password.strip()) > 0),
    }
    if kwargs.get("register"):
        schema = Schema(schema=register)
    else:
        register.pop("name")
        schema = Schema(schema=register)
    try:
        return schema.validate(data=data)
    except SchemaError as e:
        return {"error": str(e)}


def reset_password(data: Dict[str, str], **kwargs):
    if kwargs.get("forgot"):
        reset = {"email": And(str, lambda email: email.endswith("srmist.edu.in"))}
        schema = Schema(schema=reset)
    else:
        reset = {"new_password": And(str, lambda password: len(password.strip()) > 0)}
        schema = Schema(schema=reset)
    try:
        return schema.validate(data)
    except SchemaError as e:
        return {"error": str(e)}
