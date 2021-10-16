from typing import Dict
from dotenv import load_dotenv
import pymongo
import os

load_dotenv()

client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("TESTDB")]


def get_user(
    name: str = "Test",
    email: str = "test@srmist.edu.in",
    password: str = "testpassword",
) -> Dict[str, str]:
    return {"name": name, "password": password, "email": email}


def clear_all():
    db.drop_collection("users")
    db.drop_collection("RegistrationDetails")
    db.drop_collection("ErrorLog")


DATABASE = {
    "Production": {
        "MONGO_URI": os.getenv("MONGO_URI"),
        "DB": os.getenv("DB"),
    },
    "Test": {"MONGO_URI": os.getenv("MONGO_URI"), "DB": os.getenv("TESTDB")},
}
