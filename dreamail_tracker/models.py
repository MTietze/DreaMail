from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.encoding import smart_str
import re
import random
from django_mailbox.signals import message_received
from django.dispatch import receiver
from utils import process_entries
from collections import defaultdict

RESPONSE_SUBJECT = "Thanks For Dreaming"
DIVIDER = '********************************************************'

@receiver(message_received)
def save_and_respond(sender, message, **args):
    entries_dict = process_entries(message)
    dreamer = Dreamer.objects.get(email=message.from_address[0])
    response_messages = []
    for entry_date, entries in entries_dict.iteritems():
        dreams = []

        for entry in entries:
            dreams.append(JournalEntry.objects.create(dreamer=dreamer, entry=entry, date=entry_date))

        message = dreamer.generate_message()

        for dream in dreams:
            dream.message = message
            dream.save()

        formatted_date = entry_date.strftime("%A %d. %B %Y")
        joined_entries = '\n\n'.join(entries)
        response_message = "{0}\n\nYour dreams have been recorded and the universe has responded:\n\n{3}\n\n{1}\n\n{3}\n\nOn this day, you dreamt:\n\n{2}"\
            .format(formatted_date, message, joined_entries, DIVIDER)

        response_messages.append(response_message)

    joined_messages = "\n\n{0}{0}\n{0}{0}\n\n".format(DIVIDER).join(response_messages)
    response_messages = re.sub('[\r\n]{3,}','\n\n',joined_messages)

    dreamer.email_user(RESPONSE_SUBJECT, response_messages)


class Dreamer(User):
    phone_number = models.TextField(unique=True, blank=True)
    birthdate = models.DateField(null=True)

    def get_lexicon(self, format='unique'):
        words = self.journalentry_set.values_list('entry', flat=True)
        word_list = " ".join(words)
        word_list = re.findall("[a-zA-Z'\-]+", word_list)
        if format == 'unique':
            lexicon = self.unique_lexicon(word_list)
        elif format == 'weighted':
            lexicon = self.weighted_lexicon(word_list)
        else:
            raise ValueError('Please use acceptable format')
        return lexicon

    @staticmethod
    def weighted_lexicon(word_list):
        weighted_words = defaultdict(int)
        for word in word_list:
            weighted_words[word.lower()] += 1
        lexicon = [ { "text": text, 'weight' : weight } for text, weight in weighted_words.iteritems()]
        return lexicon

    @staticmethod
    def unique_lexicon(word_list):
        lexicon = list(set([word.lower() for word in word_list]))
        return lexicon

    def generate_message(self, lines=6):
        lexicon = self.get_lexicon()
        message = [" ".join(random.sample(lexicon, i)) for i in range(1, lines)]
        longest = len(max(message, key=len))
        message = [m.center(longest, ' ') for m in message]
        message = "\n".join(message)
        return message
        
class JournalEntry(models.Model):
    entry = models.TextField()
    message = models.TextField(blank=True)
    date = models.DateField(default=timezone.now, db_index=True)
    dreamer = models.ForeignKey(Dreamer, db_index=True)
    objects = models.Manager()





