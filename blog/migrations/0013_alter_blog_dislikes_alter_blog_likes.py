# Generated by Django 4.2 on 2023-09-29 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0012_blog_dislikes_blog_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='dislikes',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='blog',
            name='likes',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
