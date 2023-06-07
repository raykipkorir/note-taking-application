# pylint: disable=E1101

from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class TestUserModel(APITestCase):
    def create_user(
        self,
        *args,
        name="John Doe",
        email="johndoe@gmail.com",
        password="testing",
        **kwargs
    ):
        """Create user for testing purposes"""
        return User.objects.create_user(
            name=name, email=email, password=password, *args, **kwargs
        )

    def create_superuser(
        self,
        *args,
        name="Superuser",
        email="superuser@gmail.com",
        password="testing",
        **kwargs
    ):
        """Create super user for testing purposes"""
        return User.objects.create_superuser(
            name=name, email=email, password=password, *args, **kwargs
        )

    def test_create_user_function(self):
        user = self.create_user()
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.is_superuser, False)
        self.assertEqual(user.is_staff, False)
        self.assertEqual(str(user), "John Doe")

    def test_createsuper_function(self):
        superuser = self.create_superuser()
        self.assertTrue(isinstance(superuser, User))
        self.assertEqual(superuser.is_superuser, True)
        self.assertEqual(superuser.is_staff, True)

    def test_user_raises_error_if_email_is_not_provided(self):
        with self.assertRaises(ValueError) as context:
            self.create_user(email=None)
        self.assertEqual(str(context.exception), "Users must have an email address")

    def test_superuser_raises_error_if_is_staff_is_not_true(self):
        with self.assertRaises(ValueError) as context:
            self.create_superuser(is_staff=False)
        self.assertEqual(str(context.exception), "Superuser must have is_staff=True.")

    def test_superuser_raises_error_if_is_superuser_is_not_true(self):
        with self.assertRaises(ValueError) as context:
            self.create_superuser(is_superuser=False)
        self.assertEqual(
            str(context.exception), "Superuser must have is_superuser=True."
        )
