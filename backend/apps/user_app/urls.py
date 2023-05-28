from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('activate/<str:user_id_b64>/<str:token>/', views.activate, name='activate'),
    path('user/', views.user, name='user'),
    path('user/<int:user_id>/', views.userInfo, name='user_info'),
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset-confirm/<str:uidb64>/<str:token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]