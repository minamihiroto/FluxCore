from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('activate/<str:user_id_b64>/<str:token>/', views.activate, name='activate'),
    path('user/', views.user, name='user'),
]