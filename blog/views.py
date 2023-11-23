from django.shortcuts import render, redirect, HttpResponseRedirect, HttpResponse
from .models import Blog, Tag, Comment
from django.contrib.auth import logout, login, get_user, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse


# Create your views here.
def home(request):
    return HttpResponse("Hello World!")


# This function handles both request for logining and signingup
# It is not accessable via route neither it is a view
# rather it would be called inside of a views that needs it.
def authenticate_user(request):
    form = UserCreationForm()
    context = {}
    if request.method == "POST":
        try:
            username = request.POST["username"]
            password = request.POST["password1"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                print(request.POST)
            else:
                context = {"message": "Username or password is incorrect"}
                print(context)
        except:
            pass

        try:
            if request.POST["signup"] == "":
                form = UserCreationForm(request.POST)
                if form.is_valid():
                    form.save()
                    user = authenticate(request, username=username, password=password)
                    login(request, user)
        except:
            pass
    return context


# similar to the authenticate user function
# in that it'll be use as a component for adding comment.
def submitComment(request, blog_title):
    if request.method == "POST":
        try:
            user = User.objects.get(username=request.user.username)
            comment = request.POST["comment"]
            blog = Blog.objects.get(title=blog_title)
            print(request.user)
            userComment = Comment.objects.create(user=user, comment=comment, blog=blog)
            userComment.save()
        except:
            pass


def blog(request, name):
    # authenticating the user before
    authenticate_user(request)
    context = authenticate_user(request)
    print(context)
    # functionality for adding comments to a blog
    submitComment(request, name)
    blogs = Blog.objects.all()
    try:
        blog = Blog.objects.get(title=name)
    except:
        return render(request, "blog/error.html", {"blogtitle": name})

    context["blog"] = blog
    context["blogs"] = blogs

    return render(request, "blog/blog.html", context)


# Handling likes and dislikes asynchronously with ajax
def likes_dislikes(request, blog_id, action):
    if request.method == "GET":
        # Get the blog post based on the blog_id
        blog = Blog.objects.get(pk=blog_id)

        user = request.user
        if user.is_authenticated:
            if action == "like":
                if user in blog.liked_by.all():
                    blog.liked_by.remove(
                        user
                    )  # User has already liked, so remove the user
                else:
                    blog.liked_by.add(user)  # User is the post
                    # Remove user from disliked_by if they had disliked the post
                    if user in blog.disliked_by.all():
                        blog.disliked_by.remove(user)
            elif action == "dislike":
                if user in blog.disliked_by.all():
                    blog.disliked_by.remove(
                        user
                    )  # User has already liked, so remove the user
                else:
                    blog.disliked_by.add(user)  # User is the post
                    # Remove user from disliked_by if they had disliked the post
                    if user in blog.liked_by.all():
                        blog.liked_by.remove(user)
            else:
                return JsonResponse({"error": "Invalid action"})
        blog.save()

    return JsonResponse(
        {"likes": blog.liked_by.count(), "dislikes": blog.disliked_by.count()}
    )
