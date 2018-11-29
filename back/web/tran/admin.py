from django.contrib import admin

# Register your models here.

from .models import Article, Translation

admin.site.register(Article)
admin.site.register(Translation)