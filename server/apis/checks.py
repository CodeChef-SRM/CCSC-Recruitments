from typing import Dict
from apis import user_details
from core.errorfactory import EntryExists, InvalidTaskNumber


def accept_entry(doc: Dict[str, str]):
    try:
        user_details.enter_user_details(doc)
    except EntryExists as e:
        return str(e)


def enter_error(error_doc: Dict[str, str]):
    user_details.log_error(error=error_doc)


def validate_task_number(task_number):
    if task_number not in ["1", "2", "3"]:
        raise InvalidTaskNumber()


def enter_task(doc):
    try:
        validate_task_number(doc["task_number"])
    except InvalidTaskNumber as e:
        return str(e)

    try:
        user_details.enter_task_submission(doc)
    except Exception as e:
        return str(e)
