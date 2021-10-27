class ExistingUser(Exception):
    ...


class AuthenticationError(Exception):
    ...


class EntryExists(Exception):
    def __init__(self, *args: object) -> None:
        super().__init__("Submissions exists for user")


class InvalidTaskNumber(Exception):
    def __init__(self, task_number: str) -> None:
        super().__init__(f"Invalid Task Number {task_number}")


class NotEligile(Exception):
    def __init__(self, *args: object) -> None:
        super().__init__("User ins't eligible for this task")
