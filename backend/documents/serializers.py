from .models import *
from rest_framework import serializers


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['url', 'title', 'summary', 'source_type', 'created_date', 'modified_date', 'privacy', 'is_deleted', 
        'read_count', 'rating']