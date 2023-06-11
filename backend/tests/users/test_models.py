from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from tests.utils import create_superuser, create_user

User = get_user_model()


class TestUserModel(APITestCase):
    def test_create_user_function(self):
        user = create_user()
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.is_superuser, False)
        self.assertEqual(user.is_staff, False)
        self.assertEqual(str(user), "John Doe")

    def test_createsuper_function(self):
        superuser = create_superuser()
        self.assertTrue(isinstance(superuser, User))
        self.assertEqual(superuser.is_superuser, True)
        self.assertEqual(superuser.is_staff, True)

    def test_user_raises_error_if_email_is_not_provided(self):
        with self.assertRaises(ValueError) as context:
            create_user(email=None)
        self.assertEqual(str(context.exception), "Users must have an email address")

    def test_superuser_raises_error_if_is_staff_is_not_true(self):
        with self.assertRaises(ValueError) as context:
            create_superuser(is_staff=False)
        self.assertEqual(str(context.exception), "Superuser must have is_staff=True.")

    def test_superuser_raises_error_if_is_superuser_is_not_true(self):
        with self.assertRaises(ValueError) as context:
            create_superuser(is_superuser=False)
        self.assertEqual(
            str(context.exception), "Superuser must have is_superuser=True."
        )
