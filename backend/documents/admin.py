from django.contrib import admin
from .models import *

admin.site.register(Document)
admin.site.register(Folder)
admin.site.register(Tag)
admin.site.register(DocRating)
