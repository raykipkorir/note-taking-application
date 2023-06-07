from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Note(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
