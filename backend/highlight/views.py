from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *


class CreateHighlightView(generics.CreateAPIView):
    serializer_class = HighlightSerializer