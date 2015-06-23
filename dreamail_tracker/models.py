from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Dreamer(User):
    phone_number = models.TextField(unique=True, null=True)
    birthdate = models.DateField(null=True)

class JournalEntry(models.Model):
    entry = models.TextField()
    date = models.DateField(default=timezone.now, db_index=True)
    dreamer = models.ForeignKey(Dreamer, db_index=True)

