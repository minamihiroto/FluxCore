from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_box, name="create_box"),
    path("list/", views.get_boxes, name="get_boxes"),
]
