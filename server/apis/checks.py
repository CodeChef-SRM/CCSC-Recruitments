from typing import Dict
from apis import user_details
from core.errorfactory import EntryExists


def accept_entry(doc: Dict[str, str]):
    try:
        user_details.enter_user_details(doc)
    except EntryExists as e:
        return str(e)


def enter_registration_error(error_doc: Dict[str, str]):
    user_details.log_registration_error(error=error_doc)
