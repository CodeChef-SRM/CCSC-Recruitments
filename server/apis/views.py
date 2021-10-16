from rest_framework.views import APIView
import psutil
import os
import time
from core.throttle import throttle
from django.http.response import JsonResponse
from .checks import accept_entry, enter_registration_error
from .definitions import user_registration
from threading import Thread
from core.email import service


class HealthCheck(APIView):
    throttle_classes = [throttle]

    def get(self, *args, **kwargs):
        """Health check route
        Args:
            request (request): Request
        Returns:
            JsonResponse: Uptime
        """
        uptime = time.time() - psutil.Process(os.getpid()).create_time()
        return JsonResponse(data={"uptime": uptime, "OK": True}, status=200)


class UserRegistration(APIView):
    throttle_classes = [throttle]

    def post(self, *args, **kwargs):
        validated = user_registration(self.request.data)

        if "error" in validated:
            validated["attempted"] = self.request.auth_user["user"]
            enter_registration_error(validated)
            return JsonResponse(data={"error": validated["error"]}, status=400)

        validated.update({"email": self.request.auth_user["user"]})
        if error := accept_entry(validated):
            validated["error"] = error
            enter_registration_error(validated)
            return JsonResponse(data={"error": error}, status=409)
        Thread(
            target=service.send_mail,
            kwargs={
                "email_id": self.request.auth_user["user"],
                "email_type": "Registration Confirmation",
                "user_name": self.request.auth_user["user_name"],
            },
        ).start()

        return JsonResponse(data={"success": True}, status=201)
