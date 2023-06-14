# pylint: disable=E1101

from .models import Note

def get_all_notes(user):
    """Retrieve all notes for logged in user"""
    return Note.objects.filter(user=user, trash=False, draft=False)

def get_pinned_notes(user):
    """Retrieve all pinned notes for logged in user"""
    return Note.objects.filter(user=user, pinned=True, trash=False, draft=False)

def get_drafted_notes(user):
    """Retrieve all drafted notes for logged in user"""
    return Note.objects.filter(user=user, draft=True)

def get_trashed_notes(user):
    """Retrieve all trashed notes for logged in user"""
    return Note.objects.filter(user=user, trash=True)
