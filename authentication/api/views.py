import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({
            'msg': 'No username or password is provided',
            'success': False
        }, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({
            'msg': 'Invalid credentials. Could not login.',
            'success': False
        }, status=400)

    login(request, user)
    return JsonResponse({
        'msg': 'Logged in.',
        'success': True
    })


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({
            'msg': 'Not logged in.',
            'success': False
        }, status=400)

    logout(request)
    return JsonResponse({
        'msg': 'Logged out.',
        'success': False
    })


@ensure_csrf_cookie
def session_view(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'isAuthenticated': True
        })
    else:
        return JsonResponse({
            'isAuthenticated': False
        })


def whoami_view(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'username': request.user.username
        })
    else:
        return JsonResponse({
            'isAuthenticated': False
        })
