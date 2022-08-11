from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateDocumentView.as_view()),
    path('list/', ListDocumentView.as_view()),
    path('move/', MoveDocumentView.as_view()),
    path('addtag/', AddTagView.as_view()),
    path('trending/', TrendingView.as_view()),
    path('recommend/', RecommendView.as_view()),
    path('createdir/', CreateFolderView.as_view()),
    path('listdir/', ListFolderView.as_view()),
]