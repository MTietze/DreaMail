"""DreaMail URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views, urls
from dreamail_tracker.views import DreamView, AngularRedirectView
from dreamail_tracker.api import api

urlpatterns = [
    url('^', include('django.contrib.auth.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', DreamView.as_view(), name='home'),
    url(r'^api/get_lexicon/$', api.get_lexicon, name='get_lexicon'),
    url(r'^api/dream/(?P<page>\d{0,4})$', api.dream, name='get_dreams'),
    url(
        r'^(?P<angularpath>.*)',
        AngularRedirectView.as_view(),
        name='angularredirect'
    ),
]
