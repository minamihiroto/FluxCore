from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_directory, name="create_directory"),
]
