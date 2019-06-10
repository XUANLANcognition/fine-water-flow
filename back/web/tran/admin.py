from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Register your models here.

from .models import Article, Comment, Profile, Book, BookTag, BookBlock, BookComment, Movie, Figure

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'profile'

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline, )


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Book)
admin.site.register(BookBlock)
admin.site.register(BookTag)
admin.site.register(BookComment)
admin.site.register(Movie)
admin.site.register(Figure)