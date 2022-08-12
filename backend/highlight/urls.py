from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateHighlightView.as_view()),
    path('list/', ListHighlightView.as_view()),
    path('<int:pk>/delete/', DestroyHighlightView.as_view()),
    path('<int:pk>/update/', UpdateHiglightView.as_view()),
]