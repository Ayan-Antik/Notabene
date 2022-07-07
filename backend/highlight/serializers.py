from .models import *
from rest_framework import serializers


class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = ['text', 'container', 'anchorNode', 'anchorOffset', 'focusNode', 'focusOffset']