from threading import Thread

from core.email import service
from core.throttle import throttle
from django.http.response import JsonResponse
from rest_framework.views import APIView

from authentication import keys

from .checks import find_user, insert_user, login, update_password
from .definitions import authentication_schema, reset_password


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
                hours=False,
                expiry=5,
                payload={"reset_password": True, "user": user["email"]},
            )

            Thread(
                target=service.send_mail,
                kwargs={
                    "email_id": user["email"],
                    "email_type": "forgot-password",
                    "token": token,
                    "user_name": user["name"],
                },
            ).start()
            return JsonResponse(data={"success": True}, status=200)
        return JsonResponse(data={"success": True}, status=200)


class ResetPassword(APIView):
    throttle_classes = [throttle]

    def post(self, *args, **kwargs):
        validated = reset_password(self.request.data)

        if "error" in validated:
            return JsonResponse(data={"error": str(validated["error"])})

        if self.request.auth_user.get("reset_password"):
            data = {
                "email": self.request.auth_user["user"],
                "new_password": validated["new_password"],
            }
            update_password(data=data)
            return JsonResponse(
                data={"success": "Password updated successfully"}, status=200
            )
        return JsonResponse(data={"error": "Invalid token"}, status=403)


class Me(APIView):
    throttle_classes = [throttle]

    def get(self, *args, **kwargs):
        """Verification route goes through authentication middleware
        if authenticated attaches `request.auth_user` attribute to the request
        else forbidden
        """
        return JsonResponse(
            {
                "success": True,
                "email": self.request.auth_user["user"],
                "user": self.request.auth_user["user_name"],
            },
            status=200,
        )
