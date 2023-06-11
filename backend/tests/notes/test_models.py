from notes.models import Note
from rest_framework.test import APITestCase
from tests.utils import create_note, create_user


class TestNoteModel(APITestCase):
    def setUp(self) -> None:
        self.user = create_user()

    def test_note_instance_attributes_after_creation(self):
        note = create_note(self.user)
        self.assertTrue(isinstance(note, Note))
        self.assertEqual(note.pinned, False)
        self.assertEqual(note.draft, False)
        self.assertEqual(note.trash, False)
