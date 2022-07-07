from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *


class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer