# Generated by Django 4.0.5 on 2022-08-11 00:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0003_document_folder_folder_owner_alter_folder_name_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Tag',
        ),
        migrations.DeleteModel(
            name='TaggedDocuments',
        ),
    ]
