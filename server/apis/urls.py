from django.urls import path
from authentication.views import Login, Register, ForgotPassword, ResetPassword


urlpatterns = [
    path("login", Login.as_view()),
    path("register", Register.as_view()),
    path("forgot-password", ForgotPassword.as_view()),
    path("reset-password", ResetPassword.as_view()),
]
