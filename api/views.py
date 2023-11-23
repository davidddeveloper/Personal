from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from blog.models import Blog
from .serializers import BlogSerializer

# Create your views here.
@api_view(['GET'])
def blogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def blog(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(blog)
    return Response(serializer.data)

@api_view(['POST'])
def blogPost(request):
    data = JSONParser().parse(request) # cleaning the data
    serializer = BlogSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def updateBlog(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(instance=blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteBlog(request, pk):
    blog = Blog.objects.get(id=pk)
    blog.delete()
    return Response("Blog successfully deleted")