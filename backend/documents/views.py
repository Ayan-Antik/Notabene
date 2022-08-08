from .models import *
from rest_framework import generics
from .serializers import *


class CreateDocumentView(generics.CreateAPIView):
    serializer_class = DocumentSerializer

class ListDocumentView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    
    filterset_fields = ['owner__username']