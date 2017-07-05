
from django.conf.urls import url
from dreamail_tracker.api import api

urlpatterns = [
    url(r'^get_lexicon/$', api.get_lexicon, name='get_lexicon'),
    url(r'^dream/(?P<page>\d{0,4})$', api.dream, name='get_dreams'),
]
