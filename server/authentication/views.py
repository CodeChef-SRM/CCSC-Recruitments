from pymongo.common import validate
from rest_framework.views import APIView
from core.throttle import throttle
from .checks import insert_user, login, find_user
from .definitions import authentication_schema, reset_password
from django.http.response import JsonResponse
from authentication import keys
from threading import Thread
from core.email import service


class Register(APIView):
    throttle_classes = [throttle]

    def post(self, *args, **kwargs):
        validated = authentication_schema(self.request.data, register=True)

        if "error" in validated:
            return JsonResponse({"error": validated["error"]}, status=400)

        if error := insert_user(data=validated):
            return JsonResponse(data={"error": str(error)}, status=409)

        return JsonResponse(data={"success": True}, status=201)


class Login(APIView):
    throttle_classes = [throttle]

    def post(self, *args, **kwargs):
        validated = authentication_schema(self.request.data, login=True)

        if "error" in validated:
            return JsonResponse({"error": validated["error"]}, status=400)

        status = login(data=validated)
        if isinstance(status, str):
            return JsonResponse(data={"error": status}, status=403)
        token = keys.generate_key(
            payload={
                "user": status["email"],
                "admin": False,
                "user_name": status["name"],
            },
            get_refresh=True,
        )

        return JsonResponse(token, status=200)


class ForgotPassword(APIView):
    throttle_classes = [throttle]

    def post(self, *args, **kwargs):
        validated = reset_password(data=self.request.data, forgot=True)

        if "error" in validated:
            return JsonResponse(data={"error": str(validated)}, status=400)

        if user := find_user(validated["email"]):
            token = keys.generate_key(
                get_refresh=False,
                expiry=1,
                payload={"reset_password": True, "user": user["email"]},
            )
            Thread(
                target=service.send_mail,
                kwargs={
                    "email_id": user["email"],
                    "email_type": "forgot-password",
                    "token": token,
                },
            ).start()
            return JsonResponse(data={"success": True}, status=200)
        return JsonResponse(data={"success": True}, status=200)
