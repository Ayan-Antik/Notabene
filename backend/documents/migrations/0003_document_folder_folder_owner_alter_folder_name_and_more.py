# Generated by Django 4.0.5 on 2022-08-11 00:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('documents', '0002_document_owner_alter_document_created_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='folder',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='documents.folder'),
        ),
        migrations.AddField(
            model_name='folder',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='folder',
            name='name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='folder',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='documents.folder'),
        ),
        migrations.AlterField(
            model_name='folder',
            name='privacy',
            field=models.CharField(choices=[('pr', 'Private'), ('pu', 'Public')], default='pr', max_length=2),
        ),
    ]
