from .models import *
from rest_framework import generics
from .serializers import *


class CreateHighlightView(generics.CreateAPIView):
    serializer_class = HighlightSerializer

class ListHighlightView(generics.ListAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer