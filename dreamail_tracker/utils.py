import re
from datetime import date



def convert_to_date(date_string):
    split_dates = date_string.split("/")
    if len(split_dates[2]) == 2:
        split_dates[2] = '20' + split_dates[2]
    date_list = [split_dates[2], split_dates[0], split_dates[1]]
    date_list = [int(d) for d in date_list]
    return date(*date_list)

def process_entries(message):
    lines = message.split('\n')
    entries_dict = {}
    for line in lines:
        if re.match(r'\d{1,2}/\d{1,2}/\d{1,4}', line):
            date_string = line.strip()
            entry_date = convert_to_date(date_string)
            entries_dict[entry_date] = ['']
        else:
            later = re.split(r'later\sdream\s*-?,?\s+|separate\sdream\s*-?,?\s+', line, flags=re.I)
            if len(later) > 1:
                entries_dict[entry_date][-1] += later[0]
                capitalized_second_dream = later[1].capitalize()
                entries_dict[entry_date].append(capitalized_second_dream)
            else:
                entries_dict[entry_date][-1] += later[0]
    return entries_dict