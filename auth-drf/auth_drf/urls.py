from django.contrib import admin
from django.urls import path, include

from knox import views as knox_views

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

    # path('api-auth/', include('rest_framework.urls')),
    # path('api-auth/token/', obtain_auth_token, name='api-auth-token'),

    path('api/auth/login/', views.LoginView.as_view(), name='knox-login'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox-logout'),
    path('api/auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox-logout-all'),
    path('api/auth/whoami/', views.WhoAmI.as_view(), name='who-am-i'),
]
