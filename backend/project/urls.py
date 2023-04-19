from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('apps.user_app.urls')),
    path("box/", include("apps.box_app.urls")),
    path("directory/", include("apps.directory_app.urls")),
    path("document/", include("apps.document_app.urls")),
    path("breadcrumbs/", include("apps.breadcrumbs_app.urls")),
]
