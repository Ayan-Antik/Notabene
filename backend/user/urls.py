from django.urls import path
from .views import *

urlpatterns = [
    path('<pk>/', UserView.as_view()),
]