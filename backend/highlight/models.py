from django.db import models


class Highlight(models.Model):
    # document = models.ForeignKey(Document, on_delete=models.CASCADE)
    text = models.TextField()
    container = models.TextField()
    anchorNode = models.TextField()
    anchorOffset = models.TextField()
    focusNode = models.TextField()
    focusOffset = models.TextField()
    note = models.TextField(null=True)

    def __str__(self):
        return self.text