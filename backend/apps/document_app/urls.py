from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_document, name="create_document"),
    path('list/<int:box_id>/', views.get_documents, name='get_documents'),
]
