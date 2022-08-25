from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# class UserView(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class CreateUserView(generics.CreateAPIView):
#     serializer_class = UserSerializer

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    filterset_fields = ['id']

class SearchView(APIView):
    def get(self, request, format = None):
        queryset = User.objects.filter(username__icontains=request.query_params['keyword'])
        return Response(UserSerializer(queryset, many=True).data)