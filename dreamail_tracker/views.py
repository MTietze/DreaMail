from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required


# Create your views here.
class DreamView(TemplateView):
    template_name = "angular.html"

    def get_context_data(self, **kwargs):
        context = super(DreamView, self).get_context_data(**kwargs)

        return context