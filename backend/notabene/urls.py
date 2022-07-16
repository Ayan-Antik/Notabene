import imp
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

# from rest_framework import routers
# from user import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserView, 'user')

urlpatterns = [
    # path('', TemplateView.as_view(template_name = 'index.html')),
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('highlight/', include('highlight.urls')),
    #path('document/', include('document.urls')),
]
