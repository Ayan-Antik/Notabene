from .models import *
from rest_framework import generics
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


# class CreateDocumentView(generics.CreateAPIView):
#     serializer_class = DocumentSerializer

#*Creating Custom Document View: 
class CreateDocumentView(APIView):
    def post(self, request, format = None):
        owner = User.objects.get(username=request.data['username'])
        document = Document(owner = owner, url = request.data['url'],
                    title = request.data['title'], summary = request.data['summary'], 
                    source_type = request.data['source_type'], created_date = request.data['created_date'],
                    modified_date = request.data['modified_date'], privacy = request.data['privacy'],
                    is_deleted = request.data['is_deleted'], read_count = request.data['read_count'], rating = request.data['rating'])
        document.save()
        return Response({'id': document.id})
class ListDocumentView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    
    filterset_fields = ['owner__username', 'id']
