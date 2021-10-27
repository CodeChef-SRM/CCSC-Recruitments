from django.urls import path
from .views import UserRegistration, Tasks, DomainDetails
from authentication.views import Login, Register, ForgotPassword, ResetPassword
import os

urlpatterns = [
    path("login", Login.as_view()),
    path("forgot-password", ForgotPassword.as_view()),
    path("reset-password", ResetPassword.as_view()),
    path("task-submission", Tasks.as_view()),
    path("domain-details", DomainDetails.as_view()),
]

#! Closing registration and registration details routes for production

if os.getenv("CI"):
    urlpatterns.extend(
        [
            path("register", Register.as_view()),
            path("registration-details", UserRegistration.as_view()),
        ]
    )
