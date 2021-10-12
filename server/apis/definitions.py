from typing import Dict
from schema import Schema, SchemaError, And
import requests
import re

session = requests.Session()


def check_github_id(github_id: str):
    """Checks GitHub ID
    Args:
        github_id (str) user entred value
    """
    if len(github_id.strip()):
        _url = f"https://github.com/{github_id}"

        response = session.get(_url)

        return response.status_code == 200
    return True


def user_registration(data: Dict[str, str]):
    url_regex = re.compile(
        "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
    )
    details = {
        "reg_number": And(str, lambda reg: len(reg.strip()) == 15),
        "github_id": And(str, lambda id: check_github_id(github_id=id)),
        "linkedin": And(str, lambda url: url_regex.fullmatch(url)),
        "joining_details": And(str, lambda joining: len(joining.strip()) > 30),
        "domain_details": And(dict, lambda domain: len(domain) > 0),
    }
    try:
        return Schema(schema=details).validate(data)
    except SchemaError as e:
        return {"error": str(e)}
