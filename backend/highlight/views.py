from .models import *
from documents.models import Document
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone

class CreateHighlightView(APIView):
    def post(self, request, format=None):
        username = request.data['username']
        owner_name = request.data['owner_name']
        owner = User.objects.get(username=owner_name)
        changeOwner = False
        if username == owner_name:
            try:
                document = Document.objects.get(owner=owner, url=request.data['url'])
            except Document.DoesNotExist:
                document = Document(owner=owner, url=request.data['url'], title=request.data['title'])
                document.save()
        else:
            editor = User.objects.get(username=username)
            try:
                document = Document.objects.get(owner=owner, editors=editor, url=request.data['url'])
            except Document.DoesNotExist:
                try:
                    document = Document.objects.get(owner=editor, url=request.data['url'])
                except Document.DoesNotExist:
                    document = Document(owner=editor, url=request.data['url'], title=request.data['title'])
                    document.save()
                changeOwner = True
        highlight = Highlight(document=document, text=request.data['text'], container=request.data['container'],
            anchorNode=request.data['anchorNode'], anchorOffset=request.data['anchorOffset'],
            focusNode=request.data['focusNode'], focusOffset=request.data['focusOffset'])
        highlight.save()
        document.modified_date = timezone.now()
        document.save()
        return Response({'id': highlight.id, 'changeOwner': changeOwner}, status=status.HTTP_201_CREATED)

class ListHighlightView(generics.ListAPIView):
    queryset = Highlight.objects.all().order_by('text')
    serializer_class = HighlightSerializer
    filterset_fields = ['document__owner__username', 'document__url','document__id']

class DestroyHighlightView(generics.DestroyAPIView):
    def delete(self, request, pk, format=None):
        highlight = Highlight.objects.get(pk=pk)
        document = highlight.document
        highlight.delete()
        document.modified_date = timezone.now()
        document.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UpdateHiglightView(generics.UpdateAPIView):
    def patch(self, request, pk):
        highlight = Highlight.objects.get(pk=pk)
        document = highlight.document
        serializer = HighlightSerializer(highlight, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            document.modified_date = timezone.now()
            document.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class SearchView(APIView):
    def get(self, request, format = None):
        queryset = Highlight.objects.filter(document__id=request.query_params['doc_id'], text__icontains=request.query_params['keyword'])
        return Response(HighlightSerializer(queryset, many=True).data)