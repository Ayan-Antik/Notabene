from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

PRIVATE = 'pr'
PUBLIC = 'pu'
PRIVACY_CHOICES = [
    (PRIVATE, 'Private'),
    (PUBLIC, 'Public'),
]

class Tag(models.Model):
    name = models.CharField(max_length=20, unique=True)
    use_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Folder(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=20)
    privacy = models.CharField(max_length=2, choices=PRIVACY_CHOICES, default=PRIVATE)

    def __str__(self):
        return self.name

class Document(models.Model):
    owner = models.ForeignKey(User, related_name='owner', on_delete=models.CASCADE)
    editors = models.ManyToManyField(User, blank=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    url = models.URLField()
    title = models.TextField()
    summary = models.TextField(default="", blank=True)
    ARTICLE = 'ar'
    SOURCE_CHOICES = [
        (ARTICLE, 'Article'),
    ]
    source_type = models.CharField(max_length=2, choices=SOURCE_CHOICES, default=ARTICLE)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    privacy = models.CharField(max_length=2, choices=PRIVACY_CHOICES, default=PRIVATE)
    is_deleted = models.BooleanField(default=False)
    read_count = models.IntegerField(default=0)
    rating  = models.IntegerField(default=0)

    def __str__(self):
        return self.title