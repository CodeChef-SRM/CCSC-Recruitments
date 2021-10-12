from typing import Dict
from django.http import request
from apis import user_details
from core.errorfactory import EntryExists, InvalidTaskNumber


def accept_entry(doc: Dict[str, str]):
    try:
        user_details.enter_user_details(doc)
    except EntryExists as e:
        return str(e)


def identify_task_number(request):
    listed_tasks = ["1", "2", "3"]
    task_number = request.GET.get("task")
    try:
        assert isinstance(task_number, str)
        assert task_number in listed_tasks
    except AssertionError as e:
        raise InvalidTaskNumber(task_number=task_number)
    return task_number


def enter_task(doc: Dict[str, str], request: request):
    try:
        task_number = identify_task_number(request=request)
    except InvalidTaskNumber as e:
        return str(e)
    try:
        user_details.entry_task_details(doc, task_number=task_number)
    except EntryExists as e:
        return str(e)
