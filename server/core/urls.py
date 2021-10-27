from django.urls import path, include, re_path
from apis.views import HealthCheck
from authentication.views import Me
from .views import catch_all, get_data

urlpatterns = [
    path("", HealthCheck.as_view()),
    path("apis/", include("apis.urls")),
    path("me", Me.as_view()),
    path("review", get_data),
    re_path("^(?P<path>.*)\/?$", catch_all),
]
