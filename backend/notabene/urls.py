from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name = 'index.html')),
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('highlight/', include('highlight.urls')),
]
