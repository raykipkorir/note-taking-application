from django.urls import reverse
from rest_framework.test import APITestCase
from tests.utils import authenticate_user


class TestNoteApi(APITestCase):

    def test_create_note(self):
        authenticate_user(self.client)
        response = self.client.post(
            reverse("notes-list"),
            data={"title": "Note title", "content": "Note content"},
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieval_of_all_notes_for_the_logged_in_user(self):
        authenticate_user(self.client)
        response = self.client.get(reverse("notes-list"))
        self.assertEqual(response.status_code, 200)

    def test_retrieval_of_pinned_notes_for_the_logged_in_user(self):
        authenticate_user(self.client)
        response = self.client.get(reverse("notes-list"), data={"q": "pinned"})
        self.assertEqual(response.status_code, 200)

    def test_retrieval_of_draft_notes_for_the_logged_in_user(self):
        authenticate_user(self.client)
        response = self.client.get(reverse("notes-list"), data={"q": "draft"})
        self.assertEqual(response.status_code, 200)

    def test_retrieval_of_trash_notes_for_the_logged_in_user(self):
        authenticate_user(self.client)
        response = self.client.get(reverse("notes-list"), data={"q": "trash"})
        self.assertEqual(response.status_code, 200)
