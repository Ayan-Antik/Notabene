from operator import mod
from pyexpat import model
from turtle import title
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
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

    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    url = models.URLField()
    title = models.TextField()
    summary = models.TextField(default="")
    ARTICLE = 'ar'
    SOURCE_CHOICES = [
        (ARTICLE, 'Article'),
    ]
    source_type = models.CharField(max_length=2, choices=SOURCE_CHOICES, default=ARTICLE)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    PRIVATE = 'pr'
    PUBLIC = 'pu'
    PRIVACY_CHOICES = [
        (PRIVATE, 'Private'),
        (PUBLIC, 'Public'),
    ]
    privacy = models.CharField(max_length=2, choices=PRIVACY_CHOICES, default=PRIVATE)
    is_deleted = models.BooleanField(default=False)
    read_count = models.IntegerField(default=0)
    rating  = models.IntegerField(default=0)



    def __str__(self):
        return self.title



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