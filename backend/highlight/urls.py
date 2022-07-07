from django.urls import path
from .views import *

urlpatterns = [
    path('', CreateHighlightView.as_view()),
]