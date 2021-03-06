
from django.conf.urls import url
from dreamail_tracker.api import api

urlpatterns = [
    url(r'^get_lexicon/$', api.get_lexicon, name='get_lexicon'),
    url(r'^dream/$', api.dream, name='create_dream'),
    url(r'^dream/(?P<page>\d{0,4})/(?P<text>.*)$', api.dream, name='get_dreams'),
]
