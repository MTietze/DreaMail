from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import re
import random
from django_mailbox.signals import message_received
from django.dispatch import receiver
from dreamail_tracker.scripts.parse_journal import process_entry

@receiver(message_received)
def save_and_respond(sender, message, **args):
    body = message.get_body()
    processed_message = process_entry(body)
    dreamer = Dreamer.objects.get(email=sender)
    dreams = []
    for dream in processed_message:
        dreams.append(JournalEntry.objects.create(JournalEntry(dreamer=dreamer, date=dream.date, entry=dream.entry)))

    response_message = JournalEntry.entries.generate_message(dreamer)

    for dream in dreams:
        dream.message = response_message
        dream.save()

    print "I just recieved a message titled %s from a mailbox named %s" % (message.subject, message.mailbox.name, )

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




