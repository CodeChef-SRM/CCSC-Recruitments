from apis import user_details
from django.shortcuts import redirect
from django.http.response import JsonResponse
from bson import json_util
import json


def catch_all(reqeust, path=None):
    return redirect("https://recruitments.codechefsrm.in")


def get_data(request, path=None):
    registered = user_details.get_all_registered()
    return JsonResponse(
        data=json.loads(json_util.dumps(registered)), status=200, safe=False
    )
