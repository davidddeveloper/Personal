# Generated by Django 4.2 on 2023-09-27 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_tag_blog_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='tag',
            field=models.ManyToManyField(related_query_name='tags', to='blog.tag'),
        ),
    ]
