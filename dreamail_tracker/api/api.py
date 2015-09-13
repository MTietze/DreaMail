from dreamail_tracker.models import Dreamer
from django.views.decorators.http import require_http_methods
import json 
from django.http import HttpResponse

@require_http_methods(['POST'])
def get_dreams(request):
    body = json.loads(request.body)
    uid = body.get('uid')
    dreamer = Dreamer.objects.get(user_ptr_id=uid)
    lexicon = dreamer.get_lexicon(format='weighted')
    data = json.dumps(lexicon)
    return processHttpResponse(request, HttpResponse, data)

def processHttpResponse(request, response_type, data={}):
    response = response_type(content=(json.dumps(data)), content_type='application/json; charset=utf-8')
    response['Access-Control-Allow-Origin'] = '*'
    return response
