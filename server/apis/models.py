import pymongo
import os
from dotenv import load_dotenv
from typing import Dict, Any, List
from core.errorfactory import EntryExists, NotEligile
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
            raise EntryExists()
        self.db.RegistrationDetails.insert_one(doc)

    @staticmethod
    def check_eligibility(
        entered_domain: str,
        entered_sub_domain: str,
        domain_details: Dict[str, List[str]],
    ):
        if (
            entered_domain not in domain_details
            or entered_sub_domain not in domain_details[entered_domain]
        ):
            raise NotEligile()

    def enter_task_submission(self, doc: Dict[str, Any]):
        domain_details = self.get_domains(doc["email"])
        sub_domain = doc["sub_domain"]
        entered_domain = doc["domain"]
        self.check_eligibility(
            entered_domain=entered_domain,
            entered_sub_domain=sub_domain,
            domain_details=domain_details,
        )
        submission = self.db.TaskSubmission.find_one({"email": doc["email"]})
        if submission:
            if (
                entered_domain in submission["domain"]
                and sub_domain in submission["domain"][entered_domain]
            ):
                if (
                    doc["task_number"]
                    in submission["domain"][entered_domain][sub_domain]
                ):
                    raise EntryExists()
        self.db.TaskSubmission.find_one_and_update(
            {"email": doc["email"]},
            update={
                "$set": {
                    f"domain.{entered_domain}.{sub_domain}.{doc['task_number']}": doc[
                        "task_link"
                    ]
                }
            },
            upsert=True,
        )

    def get_domains(self, email: str):
        details = self.db.RegistrationDetails.find_one({"email": email})
        if details:
            return details["domain_details"]
        raise NotEligile()

    def get_all_registered(self):
        return list(self.db.RegistrationDetails.find({}))

    def log_error(self, error):
        self.db.ErrorLog.insert_one(error)
