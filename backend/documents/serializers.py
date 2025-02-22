from .models import *
from rest_framework import serializers

class DocumentSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField('get_owner_name')
    tag_names = serializers.SerializerMethodField('get_tag_names')
    editor_names = serializers.SerializerMethodField('get_editor_names')
    viewer_names = serializers.SerializerMethodField('get_viewer_names')

    class Meta:
        model = Document
        fields = '__all__'
        extra_fields = ['owner_name', 'tag_names', 'editor_names']

    def get_owner_name(self, document):
        return document.owner.username
    
    def get_tag_names(self, document):
        tags = document.tags
        if tags == None:
            return []
        tag_names = []
        for tag in tags.all():
            tag_names.append(tag.name)
        return tag_names

    def get_editor_names(self, document):
        editors = document.editors
        if editors == None:
            return []
        editor_names = []
        for editor in editors.all():
            editor_names.append(editor.username)
        return editor_names

    def get_viewer_names(self, document):
        viewers = document.viewers
        if viewers == None:
            return []
        viewer_names = []
        for viewer in viewers.all():
            viewer_names.append(viewer.username)
        return viewer_names

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'