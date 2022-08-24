# Generated by Django 4.0.5 on 2022-08-24 13:00

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('documents', '0009_alter_document_folder_alter_document_owner_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='editors',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
