# Generated by Django 4.0.5 on 2022-07-27 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.TextField()),
                ('title', models.TextField()),
                ('summary', models.TextField()),
                ('source_type', models.TextField()),
                ('created_date', models.DateField()),
                ('modified_date', models.DateField()),
                ('privacy', models.TextField()),
                ('is_deleted', models.BooleanField()),
                ('read_count', models.IntegerField()),
                ('rating', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Folder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('parent', models.TextField()),
                ('privacy', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('use_count', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TaggedDocuments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
