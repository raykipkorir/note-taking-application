from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from . import services
from .models import Note
from .serializers import NoteSerializer


class NoteApi(ModelViewSet):
    """Notes API"""
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_object(self):
        obj = get_object_or_404(Note, id=self.kwargs["pk"])
        return obj

    def get_queryset(self):
        query_parameter = self.request.query_params.get("q")
        if query_parameter == "pinned":
            return services.get_pinned_notes(self.request.user)
        elif query_parameter == "draft":
            return services.get_drafted_notes(self.request.user)
        elif query_parameter == "trash":
            return services.get_trashed_notes(self.request.user)
        else:
            return services.get_all_notes(self.request.user)
