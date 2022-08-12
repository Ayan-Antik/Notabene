from .models import *
from rest_framework import generics, filters
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from django.db.models import Q

READ_COUNT_THRESHOLD = 1

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

class MoveDocumentView(APIView):
    def post(self, request, format = None):
        folder = Folder.objects.get(id=request.data['folder_id'])
        document = Document.objects.get(id=request.data['document_id'])
        document.folder = folder
        document.save()
        return Response({'status': 'ok'})

class AddTagView(APIView):
    def post(self, request, format = None):
        tag = Tag.objects.get(name=request.data['tag_name'])
        document = Document.objects.get(id=request.data['document_id'])
        document.tags.add(tag)
        document.save()
        return Response({'status': 'ok'})

class TrendingView(generics.ListAPIView):
    queryset = Document.objects.filter(modified_date__gte=datetime.date.today() - datetime.timedelta(days=1),
        privacy=PUBLIC, read_count__gte=READ_COUNT_THRESHOLD)
    serializer_class = DocumentSerializer

class RecommendView(APIView):
    def get(self, request, format = None):
        print(request.query_params['username'])
        user_documents = Document.objects.filter(owner__username=request.query_params['username'])
        tag_names = set()
        for doc in user_documents:
            for tag in doc.tags.all():
                tag_names.add(tag.name)
        print(tag_names)
        tags = Tag.objects.filter(name__in=tag_names)
        print(tags)
        queryset = Document.objects.filter(~Q(owner__username=request.query_params['username']),
            privacy=PUBLIC, read_count__gte=READ_COUNT_THRESHOLD, tags__in=tags)
        return Response(DocumentSerializer(queryset.distinct(), many=True).data)

class SearchView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
   
class CreateFolderView(APIView):
    def post(self, request, format = None):
        owner = User.objects.get(username=request.data['username'])
        parent = Folder.objects.get(id=request.data['parent_id']) if 'parent_id' in request.data else None
        folder = Folder(owner=owner, parent=parent, name=request.data['name'])
        folder.save()
        return Response({'id': folder.id})

class ListFolderView(generics.ListAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    filterset_fields = ['owner__username']