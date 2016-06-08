from dreamail_tracker.models import Dreamer, JournalEntry
from django.views.decorators.http import require_http_methods
import json 
from django.http import HttpResponse
from datetime import datetime
@require_http_methods(['GET'])
def get_lexicon(request):
    dreamer = Dreamer.objects.get(user_ptr_id=request.user.id)
    lexicon = dreamer.get_lexicon(format='weighted')
    data = {"lexicon": lexicon}
    return processHttpResponse(request, HttpResponse, data)

@require_http_methods(['POST', 'GET'])
def dream(request):
    dreamer = Dreamer.objects.get(user_ptr_id=request.user.id)
    if request.method == 'POST':
        dream = json.loads(request.read().decode())
        dream_date = datetime.strptime(dream['date'], "%Y-%m-%d").date()
        entries_dict = {dream_date: [dream['text']]}
        response_message = JournalEntry.save_entry(dreamer=dreamer, entries_dict=entries_dict)
        data = {'message': response_message}
    elif request.method == 'GET':
        dreams = [d.get_data() for d in dreamer.journalentry_set.all()]
        data = {'dreams': dreams}
    return processHttpResponse(request, HttpResponse, data)

def processHttpResponse(request, response_type, data={}):
    response = response_type(content=(json.dumps(data)), content_type='application/json; charset=utf-8')
    response['Access-Control-Allow-Origin'] = '*'
    return response
