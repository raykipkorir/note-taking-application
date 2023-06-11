from django.urls import include, path
from rest_framework_nested import routers

from .apis import NoteApi

router = routers.DefaultRouter()
router.register("notes", NoteApi, basename="notes")

urlpatterns = [
    path("", include(router.urls))
]
