from django.urls import path
from django.shortcuts import HttpResponse
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("home/", views.home, name="home"),
    path("<str:name>", views.blog, name="blog"),
    path("handle_error", TemplateView.as_view(template_name="blog/error.html"), name="error_handler"),
    path("submit_comment/", views.submitComment, name="submit_comment"),
    path("<int:blog_id>/<str:action>", views.likes_dislikes, name='likes_disklikes')
]