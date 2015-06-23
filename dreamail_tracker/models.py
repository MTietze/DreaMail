from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import re
import random

class Dreamer(User):
    phone_number = models.TextField(unique=True, null=True)
    birthdate = models.DateField(null=True)

class EntryManager(models.Manager):
    def get_lexicon(self, dreamer):
        words = self.filter(dreamer=dreamer).values_list('entry', flat=True)
        word_list = " ".join(words)
        word_list = re.findall("[a-zA-Z'\-]+", word_list)
        lexicon = list(set([word.lower() for word in word_list]))
        return lexicon

    def generate_message(self, dreamer, lines=6):
        lexicon = self.get_lexicon(dreamer)
        message = [" ".join(random.sample(lexicon, i)) for i in range(lines)]
        longest = len(max(message, key=len))
        message = [m.center(longest, ' ') for m in message]
        message = "\n".join(message)
        return message


class JournalEntry(models.Model):
    entry = models.TextField()
    message = models.TextField(blank=True)
    date = models.DateField(default=timezone.now, db_index=True)
    dreamer = models.ForeignKey(Dreamer, db_index=True)
    entries = EntryManager()
    objects = models.Manager()




