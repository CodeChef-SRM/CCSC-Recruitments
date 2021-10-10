import unittest
from tests import test_authentication

def main():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(test_authentication.TestAuthentication))
    output = unittest.TextTestRunner(verbosity=2).run(suite)
    if output.errors or output.failures:
        print("Failing Tests")


if __name__ == "__main__":
    main()