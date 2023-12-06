# Generated by Django 4.2.7 on 2023-12-05 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ImageWithCaption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('caption', models.CharField(max_length=255)),
                ('translated_caption', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]