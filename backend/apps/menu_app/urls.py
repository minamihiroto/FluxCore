from django.urls import path
from . import views

urlpatterns = [
    path("tree/", views.fetch_tree, name="fetch_tree"),
]