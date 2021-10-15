import pymongo
import os
from dotenv import load_dotenv
from typing import Dict
from core.errorfactory import EntryExists
from core.settings import DEBUG

load_dotenv()


class UserModel:
    def __init__(self):
        """API for User details i.e Task Submission details and
        User Registration Details.
        """
        client = pymongo.MongoClient(os.getenv("MONGO_URI"))
        if DEBUG or os.getenv("CI"):
            self.db = client[os.getenv("TESTDB")]
        else:
            self.db = client[os.getenv("DB")]

    def enter_user_details(self, doc: Dict[str, str]):
        """Enter user registration details into the collection.

        Args:
            doc (Dict[str, str]): user details

        Raises:
            EntryExists: Raised if user has already registered
        """
        details = self.db.RegistrationDetails.find_one({"email": doc["email"]})
        if details:
            raise EntryExists("Details for user already exist!")
        self.db.RegistrationDetails.insert_one(doc)

    def get_all_registered(self):
        return list(self.db.RegistrationDetails.find({}))
