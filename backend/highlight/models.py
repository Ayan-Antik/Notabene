from django.db import models
from documents.models import Document

class Highlight(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, null=True)
    text = models.TextField()
    container = models.TextField()
    anchorNode = models.TextField()
    anchorOffset = models.IntegerField()
    focusNode = models.TextField()
    focusOffset = models.IntegerField()
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.text