from rest_framework.views import APIView
import psutil
import os
import time
from core.throttle import throttle
from django.http.response import JsonResponse


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
