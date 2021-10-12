from django.shortcuts import redirect


def catch_all(reqeust, path=None):
    return redirect("https://recruitments.codechefsrm.in")
