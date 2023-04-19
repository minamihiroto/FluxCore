from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_directory, name="create_directory"),
    path('list/<int:box_id>/', views.get_directories, name='get_directories'),
    path('<int:directory_id>/', views.get_directory_details, name='get_directory_details')
]
