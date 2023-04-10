from django.contrib import admin
from django.urls import path, include

from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

    # path('api-auth/', include('rest_framework.urls')),
    path('api-auth/token/', obtain_auth_token, name='api-auth-token'),
]