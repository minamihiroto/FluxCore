from django.urls import path
from . import views

urlpatterns = [
    path('directory/<int:directory_id>/', views.get_directory, name='get_directory'),
    path('document/<int:document_id>/', views.get_document, name='get_document'),
]
