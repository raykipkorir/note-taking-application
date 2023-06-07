# pylint: disable=E1101

from django.contrib.auth import get_user_model
from django.urls import reverse
from notes.models import Note

User = get_user_model()


def create_user(
    *args, name="John Doe", email="johndoe@gmail.com", password="testing", **kwargs
):
    """Create user for testing purposes"""
    return User.objects.create_user(
        name=name, email=email, password=password, *args, **kwargs
    )


def create_superuser(
    *args, name="Superuser", email="superuser@gmail.com", password="testing321", **kwargs
):
    """Create super user for testing purposes"""
    return User.objects.create_superuser(
        name=name, email=email, password=password, *args, **kwargs
    )


def create_note(user, title="Note title", content="Note content") -> Note:
    return Note.objects.create(title=title, content=content, user=user)


def authenticate_user(client) -> None:
    user = create_user(password="testing321")
    response = client.post(
        reverse("token_obtain_pair"),
        data={"email": user.email, "password": "testing321"}
    )
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.json()['access']}")
