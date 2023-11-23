from django.urls import path
from . import views

# blog api routes
# blogs --> api/blogs
# blog --> api/blog/<int:id>
# post blog --> api/blog/post
# update blog --> api/blog/update/<int:id>
# delete blog --> api/blog/delete/<int:id>
urlpatterns = [
    path("blogs", views.blogs),
    path("blog/<int:pk>", views.blog),
    path("blog/post", views.blogPost),
    path("blog/update/<int:pk>", views.updateBlog),
    path("blog/delete/<int:pk>", views.deleteBlog) 
]