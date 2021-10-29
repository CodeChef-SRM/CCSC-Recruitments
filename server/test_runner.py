import unittest
from tests import (
    test_authentication,
    test_resetpassword,
    test_user_registration,
    test_task_submissions,
    test_webhook,
)


def main():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(test_authentication.TestAuthentication))
    suite.addTest(unittest.makeSuite(test_resetpassword.TestResetPassword))
    suite.addTest(unittest.makeSuite(test_user_registration.TestRegistration))
    suite.addTest(unittest.makeSuite(test_task_submissions.TestSubmissions))
    suite.addTest(unittest.makeSuite(test_webhook.TestAdminOnlyRoute))
    output = unittest.TextTestRunner(verbosity=2).run(suite)
    if output.errors or output.failures:
        print("Failing Tests")


if __name__ == "__main__":
    main()
