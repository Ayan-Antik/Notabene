from .models import *
from rest_framework import serializers

class DocumentSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField('get_owner_name')

    class Meta:
        model = Document
        fields = '__all__'
        extra_fields = ['owner_name']

    def get_owner_name(self, document):
        return document.owner.username

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'