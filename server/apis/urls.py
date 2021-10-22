from django.urls import path
from .views import UserRegistration
from authentication.views import Login, Register, ForgotPassword, ResetPassword
import os

urlpatterns = [
    path("login", Login.as_view()),
    # path("register", Register.as_view()),
    path("forgot-password", ForgotPassword.as_view()),
    path("reset-password", ResetPassword.as_view()),
    # path("registration-details", UserRegistration.as_view()),
]

#! Closing registration and registration details routes for production

if os.getenv("CI"):
    urlpatterns.extend(
        [
            path("register", Register.as_view()),
            path("registration-details", UserRegistration.as_view()),
        ]
    )
