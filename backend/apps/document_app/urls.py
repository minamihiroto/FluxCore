from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_document, name="create_document"),
    path('boxlist/<int:box_id>/', views.get_box_documents, name='get_box_documents'),
    path('directorylist/<int:directory_id>/', views.get_directory_documents, name='get_directory_documents'),
    path('<int:document_id>/', views.get_document_details, name='get_document_details'),
    path('update/<int:document_id>/', views.update_document, name='update_document'),
]
