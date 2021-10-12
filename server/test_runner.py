import unittest
from tests import test_authentication, test_resetpassword, test_user_registration


def main():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(test_authentication.TestAuthentication))
    suite.addTest(unittest.makeSuite(test_resetpassword.TestResetPassword))
    suite.addTest(unittest.makeSuite(test_user_registration.TestRegistration))
    output = unittest.TextTestRunner(verbosity=2).run(suite)
    if output.errors or output.failures:
        print("Failing Tests")


if __name__ == "__main__":
    main()
