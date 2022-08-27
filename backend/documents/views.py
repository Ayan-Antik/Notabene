from .models import *
from rest_framework import generics
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from django.db.models import Q
from django.conf import settings
from django.core.mail import send_mail
from django.db.models import Avg

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
    filterset_fields = ['owner__username', 'id', 'folder__id', 'privacy', 'editors__username', 'url']

class RecentDocumentView(APIView):
    def get(self, request, format = None):
        queryset = Document.objects.filter(owner__username=request.query_params['username'],
            modified_date__gte=datetime.date.today() - datetime.timedelta(days=3))
        return Response(DocumentSerializer(queryset, many=True).data)

class UpdateDocumentView(generics.UpdateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class DeleteDocumentView(generics.DestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class AddTagView(APIView):
    def post(self, request, format = None):
        try:
            tag = Tag.objects.get(name=request.data['tag_name'])
        except Tag.DoesNotExist:
            tag = Tag(name=request.data['tag_name'])
            tag.save()
        tag.use_count+=1
        tag.save()
        document = Document.objects.get(id=request.data['document_id'])
        document.tags.add(tag)
        document.modified_date = timezone.now()
        document.save()
        return Response({'status': 'ok'})

class ListTagView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class SearchTagView(APIView):
    def get(self, request, format = None):
        queryset = Tag.objects.filter(name__icontains=request.query_params['keyword'])
        return Response(TagSerializer(queryset, many=True).data)

class DeleteTagView(APIView):
     def post(self, request, format = None):
        tag = Tag.objects.get(name=request.data['tag_name'])
        tag.use_count-=1
        tag.save()
        document = Document.objects.get(id=request.data['document_id'])
        document.tags.remove(tag)
        document.modified_date = timezone.now()
        document.save()
        return Response({'status': 'ok'})
class TrendingView(generics.ListAPIView):
    queryset = Document.objects.filter(modified_date__gte=datetime.date.today() - datetime.timedelta(days=3),
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
            privacy=PUBLIC, read_count__gte=READ_COUNT_THRESHOLD, tags__in=tags).distinct()
        return Response(DocumentSerializer(queryset, many=True).data)

class SearchView(APIView):
    def get(self, request, format = None):
        queryset = Document.objects.filter(Q(privacy=PUBLIC) | Q(owner__username=request.query_params['username']),
        title__icontains=request.query_params['keyword'])
        return Response(DocumentSerializer(queryset, many=True).data)
   
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

class DeleteFolderView(generics.DestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
class AddCollabView(APIView):
    def patch(self, request, pk):
        username = request.data['username']
        role = request.data['role']
        document = Document.objects.get(pk=pk)
        user = User.objects.get(username=username)
        if role == "viewer":
            document.editors.remove(user)
            document.viewers.add(user)
            article = 'a'
        elif role == "editor":
            document.viewers.remove(user)
            document.editors.add(user)
            article = 'an'
        else:
            return Response({'status': 'error'})
        subject = 'Notabene Document Collaboration Invitation'
        message = (f'Hi {username}, You have been added as {article} {role} in the Notabene document titled \"{document.title}\". '
        + f'Click the following link to view the document:\nhttp://localhost:3000/notes/{document.id}/')
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email, ]
        send_mail( subject, message, email_from, recipient_list )
        return Response({'status': 'ok'})

class SharedListView(APIView):
    def get(self, request, format = None):
        queryset = Document.objects.filter(Q(editors__username=request.query_params['username']) | 
            Q(viewers__username=request.query_params['username']))
        return Response(DocumentSerializer(queryset, many=True).data)

class RatingView(APIView):
    def get(self, request, format = None):
        try:
            docRating = DocRating.objects.get(user__id=request.query_params['user_id'], document__id=request.query_params['document_id'])
        except DocRating.DoesNotExist:
            return Response({'rating': 0})
        return Response({'rating': docRating.rating})

    def post(self, request, format = None):
        user = User.objects.get(id=request.data['user_id'])
        document = Document.objects.get(id=request.data['document_id'])
        try:
            docRating = DocRating.objects.get(user=user, document=document)
        except DocRating.DoesNotExist:
            docRating = DocRating(user=user, document=document)
            docRating.save()
        docRating.rating = request.data['rating']
        docRating.save()
        return Response({'status': 'ok'})

class TotalRatingView(APIView):
    def get(self, request, format = None):
        docRatings = DocRating.objects.filter(document__id=request.query_params['document_id'])
        return Response(docRatings.aggregate(Avg('rating')))