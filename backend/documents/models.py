from operator import mod
from pyexpat import model
from turtle import title
from django.db import models

# Create your models here.

class Document(models.Model):
    # document = models.ForeignKey(Document, on_delete=models.CASCADE)
    # text = models.TextField()
    # container = models.TextField()
    # anchorNode = models.TextField()
    # anchorOffset = models.TextField()
    # focusNode = models.TextField()
    # focusOffset = models.TextField()
    # note = models.TextField(null=True)

    url = models.TextField()
    title = models.TextField()
    summary = models.TextField()
    source_type = models.TextField()
    created_date = models.DateField()
    modified_date = models.DateField()
    privacy = models.TextField()
    is_deleted = models.BooleanField()
    read_count = models.IntegerField()
    rating  = models.IntegerField()



    def __str__(self):
        return self.text



class Folder(models.Model):

    name = models.TextField()
    parent = models.TextField()
    privacy = models.TextField()

    def __str__(self):
        return self.text


class Tag(models.Model):

    name = models.TextField()
    use_count = models.IntegerField()

    def __str__(self):
        return self.text


class TaggedDocuments(models.Model):

    def __str__(self):
        return self.text