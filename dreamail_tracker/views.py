from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
import os

# Create your views here.
class DreamView(TemplateView):
    template_name = "index.html"
    print str(os.path)
    print 'hi'
    def get_context_data(self, **kwargs):
        context = super(DreamView, self).get_context_data(**kwargs)

        return context