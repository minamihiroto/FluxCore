from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_box, name="create_box"),
    path("list/", views.get_boxes, name="get_boxes"),
    path('<int:box_id>/', views.get_box_details, name='get_box_details'),
    path('update/<int:box_id>/', views.update_box, name='update_box'),
]
