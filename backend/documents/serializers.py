from .models import *
from rest_framework import serializers

class DocumentSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField('get_owner_name')
    tag_names = serializers.SerializerMethodField('get_tag_names')

    class Meta:
        model = Document
        fields = '__all__'
        extra_fields = ['owner_name', 'tag_names']

    def get_owner_name(self, document):
        return document.owner.username
    
    def get_tag_names(self, document):
        tags = document.tags
        print(tags)
        if tags == None:
            return []
        tag_names = []
        for tag in tags.all():
            tag_names.append(tag.name)
        print(tag_names)
        return tag_names

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'