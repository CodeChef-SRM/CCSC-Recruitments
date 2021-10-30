from rest_framework.views import APIView
import psutil
import os
import time
from core.throttle import throttle
from django.http.response import JsonResponse
from .checks import accept_entry, enter_error, enter_task, domain_details
from .definitions import user_registration, task_submission
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
        #! Closed View
        validated = user_registration(self.request.data)

        if "error" in validated:
            validated["attempted"] = {
                "email": self.request.auth_user["user"],
                "name": self.request.auth_user["user_name"],
            }
            enter_error(validated)
            return JsonResponse(data={"error": validated["error"]}, status=400)

        validated.update({"email": self.request.auth_user["user"]})
        if error := accept_entry(validated):
            validated["error"] = error
            enter_error(validated)
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


class Tasks(APIView):
    throttle_classes = [throttle]

    def post(self, *args, **kwargs):
        validated = task_submission(self.request.data)

        if "error" in validated:
            validated["attempted"] = {
                "email": self.request.auth_user["user"],
                "name": self.request.auth_user["user_name"],
            }
            enter_error(validated)
            return JsonResponse(data={"error": validated["error"]}, status=400)

        validated["task_number"] = self.request.GET.get("task")
        validated["email"] = self.request.auth_user["user"]
        if error := enter_task(validated):
            error_doc = {
                "error": error,
                "attempted": {
                    "email": self.request.auth_user["user"],
                    "name": self.request.auth_user["user_name"],
                },
            }
            enter_error(error_doc)
            if str(error) == "Submissions exists for user":
                return JsonResponse(data={"error": str(error)}, status=409)
            return JsonResponse(data={"error": str(error)}, status=400)

        return JsonResponse(data={"success": True}, status=201)


class DomainDetails(APIView):
    throttle_classes = [throttle]

    def get(self, *args, **kwargs):
        domains = domain_details(self.request.auth_user["user"])

        if isinstance(domains, str):
            domains = {"error": domains}
            return JsonResponse(data=domains, status=400)

        domains["instruction"] = ["Instructions"]
        return JsonResponse(data=domains, status=200)
