import re
from datetime import date
from dreamail_tracker.models import JournalEntry, Dreamer

entries_dict = {}
dreamer_id = 1
def convert_to_date(date_string):
    split_dates = date_string.split("/")
    if len(split_dates[2]) == 2:
        split_dates[2] = '20' + split_dates[2]
    date_list = [split_dates[2], split_dates[0], split_dates[1]]
    date_list = [int(d) for d in date_list]
    return date(*date_list)

def process_entry(entry):
    pass


with open('/Users/max/Documents/dreamjournal.txt') as journal:
    for line in journal:
        if re.match(r'\d{1,2}/\d{1,2}/\d{1,4}', line):
            date_string = line.strip()
            entries_dict[date_string] = ['']
        else:
            later = re.split(r'later\sdream\s*-?,?\s+|separate\sdream\s*-?,?\s+', line, flags=re.I)
            if len(later) > 1:
                entries_dict[date_string][-1] += later[0]
                capitalized_second_dream = later[1].capitalize()
                entries_dict[date_string].append(capitalized_second_dream)
            else:
                entries_dict[date_string][-1] += later[0]

    for entry_date, entries in entries_dict.iteritems():
        entry_date = convert_to_date(entry_date)
        for entry in entries:
            JournalEntry.objects.create(dreamer_id=dreamer_id, entry=entry, date=entry_date)

