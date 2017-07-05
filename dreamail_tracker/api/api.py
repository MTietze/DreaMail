from dreamail_tracker.models import Dreamer, JournalEntry
from django.views.decorators.http import require_http_methods
import json
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.postgres.search import SearchVector
from datetime import datetime


@require_http_methods(['GET'])
def get_lexicon(request):
    dreamer = Dreamer.objects.get(user_ptr_id=request.user.id)
    lexicon = dreamer.get_lexicon(format='weighted')
    data = {"lexicon": lexicon}
    return processHttpResponse(request, HttpResponse, data)


@require_http_methods(['POST', 'GET'])
def dream(request, page, text):
    dreamer = Dreamer.objects.get(user_ptr_id=request.user.id)
    if request.method == 'POST':
        dream_data = json.loads(request.read().decode())
        dream_date = datetime.strptime(dream_data['date'], "%Y-%m-%d").date()
        entries_dict = {dream_date: [{'title': dream_data.get('title',''), 'text': dream_data['text']}]}
        response_message = JournalEntry.save_entry(dreamer=dreamer, entries_dict=entries_dict)
        data = {'message': response_message}
    elif request.method == 'GET':
        if text:
            entries = dreamer.journalentry_set\
                             .annotate(search=SearchVector('entry', 'title'))\
                             .filter(search=text)
        else:
            entries = dreamer.journalentry_set.all()
        paginator = Paginator(entries, 10)
        try:
            paginated_dreams = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            paginated_dreams = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver empty array.
            paginated_dreams = []

        dreams = [d.get_data() for d in paginated_dreams]
        data = {'dreams': dreams}
    return processHttpResponse(request, HttpResponse, data)


def processHttpResponse(request, response_type, data=None):
    data = data or {}
    response = response_type(content=(json.dumps(data)), content_type='application/json; charset=utf-8')
    response['Access-Control-Allow-Origin'] = '*'
    return response
