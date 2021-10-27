from typing import Dict, Union
from core.settings import DEBUG
import pymongo
import hashlib
import os
from core.errorfactory import ExistingUser, AuthenticationError


class AuthenticationModel:
    def __init__(self):
        """API for user credentials."""
        client = pymongo.MongoClient(os.getenv("MONGO_URI"))
        if DEBUG or os.getenv("CI"):
            self.db = client[os.getenv("TESTDB")]
        else:
            self.db = client[os.getenv("DB")]

    def register_user(self, data: Dict[str, Union[str, int]]):
        """Search for user with this email Id
           if found raise `ExistingUser` else hash user password
           and insert document.

        Args:
            data (Dict[str, Union[str, int]]): user document

        Raises:
            ExistingUser: Raised on duplication
        """
        user = self.db.users.find_one({"email": data["email"]})
        if user:
            raise ExistingUser(f"Account exists with the email Id {user['email']}")
        else:
            data["password"] = hashlib.sha256(data["password"].encode()).hexdigest()
            self.db.users.insert_one(data)

    def login(self, data: Dict[str, Union[str, int]]) -> Dict[str, str]:
        """Checks db with filter `email` and `password`
           hashes incoming password before checking db

        Args:
            data (Dict[str, Union[str, int]]): user data

        Raises:
            AuthenticationError: raised on invalid authentication

        Returns:
            Dict: user document
        """
        data["password"] = hashlib.sha256(data["password"].encode()).hexdigest()
        user = self.db.users.find_one(
            {"email": data["email"], "password": data["password"]}
        )
        if user:
            return user
        raise AuthenticationError("Invalid Credentials")

    def user_from_email(self, email_id: str):
        user = self.db.users.find_one({"email": email_id})
        if user:
            return user

    def update_password(self, password: str, email: str):
        password = hashlib.sha256(password.encode()).hexdigest()
        user = self.db.users.find_one_and_update(
            {"email": email}, update={"$set": {"password": password}}
        )
        return user

    def check_webhook(self, webhook: str):
        webhook = self.db.WebHook.find_one({"token": webhook})
        if webhook:
            return True
        raise AuthenticationError
