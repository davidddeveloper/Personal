from typing import Any
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name


class Blog(models.Model):
    title = models.CharField(max_length=60)
    text = models.TextField()
    image = models.ImageField(upload_to='media/', blank=True, null=True)
    date_posted = models.DateField(blank=True, null=True)
    read_time = models.IntegerField(default=0, blank=True, null=True)
    tag = models.ManyToManyField(to=Tag, blank=True)
    liked_by = models.ManyToManyField(to=User, related_name='liked_blogs', blank=True)
    disliked_by = models.ManyToManyField(to=User, related_name='disliked_by', blank=True)
    #likes = models.IntegerField(default=0, blank=True, null=True)
    #dislikes = models.IntegerField(default=0, blank=True, null=True)
    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    comment = models.TextField(max_length=500)
    blog = models.ForeignKey(to=Blog, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.comment