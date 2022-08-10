from .models import *
from documents.models import Document
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response

class CreateHighlightView(APIView):
    def post(self, request, format=None):
        owner = User.objects.get(username=request.data['username'])
        try:
            document = Document.objects.get(owner=owner, url=request.data['url'])
        except Document.DoesNotExist:
            document = Document(owner=owner, url=request.data['url'], title=request.data['title'])
            document.save()
        highlight = Highlight(document=document, text=request.data['text'], container=request.data['container'],
            anchorNode=request.data['anchorNode'], anchorOffset=request.data['anchorOffset'],
            focusNode=request.data['focusNode'], focusOffset=request.data['focusOffset'])
        highlight.save()
        return Response({'id': highlight.id})

class ListHighlightView(generics.ListAPIView):
    queryset = Highlight.objects.all()
    serializer_class = HighlightSerializer
    filterset_fields = ['document__owner__username', 'document__url','document__id']