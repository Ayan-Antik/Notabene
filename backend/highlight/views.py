from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *


class CreateHighlightView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = HighlightSerializer