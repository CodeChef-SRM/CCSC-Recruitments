from django.urls import path, include
from apis.views import HealthCheck

urlpatterns = [
    path("", HealthCheck.as_view()),
    path("apis/", include("apis.urls")),
]
