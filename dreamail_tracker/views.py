from django.views.generic import TemplateView, RedirectView
from django.core.urlresolvers import reverse
import simplejson as json

# Create your views here.
class DreamView(TemplateView):
    template_name = "angular.html"

    def get_context_data(self, **kwargs):

        context = super(DreamView, self).get_context_data(**kwargs)

        try:
            context["ANGULAR_PARAMS"] = json.dumps(self.request.session.pop("ANGULAR_PARAMS"))
        except KeyError:
            context["ANGULAR_PARAMS"] = '{}'
        try:
            context["ANGULAR_PATH"] = self.request.session.pop("ANGULAR_PATH")
        except KeyError:
            context["ANGULAR_PATH"] = ''
        return context

class AngularRedirectView(RedirectView):
    """
        If a provider search url is entered including an angular path, but without the hashtag, grab the path and any parameters
        and store them in the session before redirecting, so they may be passed to angular as context data.
    """

    def get_redirect_url(self, **kwargs):

        self.request.session["ANGULAR_PATH"] = kwargs.get('angularpath')
        self.request.session["ANGULAR_PARAMS"] = self.request.GET

        return reverse('home')