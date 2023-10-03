from django.contrib import admin
from .models import Blog, Tag, Comment
from ckeditor.widgets import CKEditorWidget
from django.db import models
# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': CKEditorWidget()},
    }

admin.site.register(Blog, BlogAdmin)
admin.site.register(Tag)
admin.site.register(Comment)
