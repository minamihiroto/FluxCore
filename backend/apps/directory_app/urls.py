from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_directory, name="create_directory"),
    path('boxlist/<int:box_id>/', views.get_box_directories, name='get_box_directories'),
    path('directorylist/<int:directory_id>/', views.get_directory_directories, name='get_directory_directories'),
    path('<int:directory_id>/', views.get_directory_details, name='get_directory_details')
]
