# Generated by Django 4.2 on 2023-10-02 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_remove_blog_dislikes_remove_blog_likes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='tag',
            field=models.ManyToManyField(blank=True, to='blog.tag'),
        ),
    ]
