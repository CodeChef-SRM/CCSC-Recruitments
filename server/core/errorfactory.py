class ExistingUser(Exception):
    ...


class AuthenticationError(Exception):
    ...


class EntryExists(Exception):
    ...


class InvalidTaskNumber(Exception):
    def __init__(self, task_number: str):
        super().__init__(f"Invalid Task Number {task_number}")
