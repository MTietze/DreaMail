import re
import datetime

# creates an eastern timezone instance
class EST5EDT(datetime.tzinfo):

    def utcoffset(self, dt):
        return datetime.timedelta(hours=-5) + self.dst(dt)

    def dst(self, dt):
        d = datetime.datetime(dt.year, 3, 8)        #2nd Sunday in March
        self.dston = d + datetime.timedelta(days=6-d.weekday())
        d = datetime.datetime(dt.year, 11, 1)       #1st Sunday in Nov
        self.dstoff = d + datetime.timedelta(days=6-d.weekday())
        if self.dston <= dt.replace(tzinfo=None) < self.dstoff:
            return datetime.timedelta(hours=1)
        else:
            return datetime.timedelta(0)

    def tzname(self, dt):
        return 'EST5EDT'

def convert_to_date(date_string):
    split_dates = date_string.split("/")
    if len(split_dates[2]) == 2:
        split_dates[2] = '20' + split_dates[2]
    date_list = [split_dates[2], split_dates[0], split_dates[1]]
    date_list = [int(d) for d in date_list]
    return datetime.date(*date_list)

def process_entries(message):
    lines = message.text.strip().split('\n')
    entries_dict = {}
    if not re.match(r'\d{1,2}/\d{1,2}/\d{1,4}', lines[0]):
        entry_date = message.processed.astimezone(tz=EST5EDT())
        entries_dict[entry_date] = ['']
    for line in lines:
        if re.match(r'\d{1,2}/\d{1,2}/\d{1,4}', line):
            date_string = line.strip()
            entry_date = convert_to_date(date_string)
            entries_dict[entry_date] = ['']
        else:
            later = re.split('later\sdream\s*-?,?\s+|separate\sdream\s*-?,?\s+', line, flags=re.I)
            if len(later) > 1:
                entries_dict[entry_date][-1] += later[0]
                capitalized_second_dream = later[1].capitalize()
                entries_dict[entry_date].append(capitalized_second_dream)
            else:
                entries_dict[entry_date][-1] += later[0]
    return entries_dict