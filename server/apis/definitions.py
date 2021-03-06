from typing import Dict
from schema import Schema, SchemaError, And
import requests
import re

session = requests.Session()

url_regex = re.compile(
    "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
)


def check_linkedin_link(url):
    return url_regex.fullmatch(url) and "linkedin" in url.lower()


def check_github_id(github_id: str):
    """Checks GitHub ID
    Args:
        github_id (str) user entred value
    """
    _id = github_id.strip()
    if len(_id):
        #! Check if smart kids entered full url if yes then validate :)
        if url_regex.fullmatch(_id):
            response = session.get(_id)
            return response.status_code == 200
        #! Check if people entered what's asked for :)
        else:
            _url = f"https://github.com/{_id}"
            response = session.get(_url)
            return response.status_code == 200
    return True


def check_domain(domain):
    check = True
    for d in domain:
        if not len(domain[d]) == 1:
            check = False
    return check


def user_registration(data: Dict[str, str]):
    details = {
        "reg_number": And(
            str, lambda reg: len(reg.strip()) == 15 and reg.lower().startswith("ra")
        ),
        "github_id": And(str, lambda id: check_github_id(github_id=id)),
        "linkedin": And(str, lambda url: check_linkedin_link(url)),
        "joining_details": And(str, lambda joining: len(joining.strip()) > 30),
        "domain_details": And(
            dict,
            lambda domain: len(domain) > 0 and len(domain) < 3 and check_domain(domain),
        ),
        "year": And(str, lambda year: year in ["1", "2"]),
        "branch": And(str, lambda branch: len(branch.strip()) > 0),
    }
    try:
        return Schema(schema=details).validate(data)
    except SchemaError as e:
        return {"error": str(e)}


def task_submission(data: Dict[str, str]):
    domains = ["tech", "creat", "corp"]
    submission = {
        "task_link": And(str, lambda url: url_regex.fullmatch(url)),
        "domain": And(str, lambda domain: domain in domains),
        "sub_domain": And(str, lambda sub_domain: len(sub_domain.strip()) > 0),
    }
    try:
        return Schema(schema=submission).validate(data)
    except SchemaError as e:
        return {"error": str(e)}
