from authentication import keys, auth_model
from django.http.response import JsonResponse
from core.errorfactory import AuthenticationError
from .utils import check_token
import os


class AuthMiddleWare:
    def __init__(self, view):
        self.view = view
        self._protected = ["/apis/reset-password", "/me", "/apis/registration-details"]
        self._internal = "/review"

    @staticmethod
    def _validate_tokentype(authorization: str):
        try:
            token_type, token = authorization.split()
            assert token_type == "Bearer"
        except Exception as e:
            raise AuthenticationError("Invalid Token")
        return token

    def authenticate_request(self, request):
        try:
            token = self._validate_tokentype(request.headers.get("Authorization"))
        except AuthenticationError as e:
            return JsonResponse(data={"error": str(e)}, status=403)
        if user := keys.verify_key(key=token):
            request.auth_user = user
            return self.view(request)
        return JsonResponse(data={"error": "Invalid credentials"}, status=403)

    def admin_authentication(self, request):
        """Check WebHook for ADMINS ONLY
        Args:
            request: wsgi request

        Returns:
            bool: Allow if webhook present
        """
        try:
            token_type, token = request.headers.get("Authorization").split()
            assert token_type == "Bearer"
            if auth_model.check_webhook(token):
                return self.view(request)
        except Exception:
            return JsonResponse(data={"error": "Invalid Credentials"}, status=403)

    def __call__(self, request):
        #! Admin entry only
        if request.path == self._internal:
            return self.admin_authentication(request)

        if request.path in self._protected:
            return self.authenticate_request(request)
        return self.view(request)


class ReCaptcha:
    def __init__(self, view):
        self.view = view

    def __call__(self, request, **kwargs) -> JsonResponse:
        """Recaptcha middleware
        Args:
            request
        Returns:
            JsonResponse
        """

        if os.getenv("CI"):
            return self.view(request)

        if request.method == "POST" or request.method == "DELETE":
            if request.path == "/apis/registration-details":
                return self.view(request)
            try:
                recaptcha = request.META["HTTP_X_RECAPTCHA_TOKEN"]
            except KeyError as e:
                return JsonResponse(
                    data={"error": "recaptcha token not provided"}, status=401
                )

            if check_token(recaptcha):
                return self.view(request)

            return JsonResponse(data={"error": "invalid recaptcha token"}, status=401)
        return self.view(request)
