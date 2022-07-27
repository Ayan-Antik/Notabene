from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateDocumentView.as_view()),
    path('list/', ListDocumentView.as_view()),
]