# Generated by Django 4.0.5 on 2022-08-27 19:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0013_remove_document_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='folder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='documents.folder'),
        ),
    ]
