from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Register your models here.

from .models import Article, Comment, Profile, Book, BookTag, BookBlock, BookComment, Movie, Figure, MovieComment

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'profile'
    filter_horizontal = ('follow', )

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline, )

class CommentInline(admin.StackedInline):
    model = Comment
    list_display = ('user',)
    list_filter = ('pub_date', 'user')
    list_per_page = 10
    search_fields = ('user',)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'user')
    list_filter = ('pub_date', 'user')
    list_per_page = 10
    search_fields = ('user',)
    inlines = [CommentInline, ]

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user',)
    list_filter = ('pub_date', 'user')
    list_per_page = 10
    search_fields = ('user',)

class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', )
    list_filter = ('pub_date', )
    list_per_page = 10
    filter_horizontal = ('actor', 'director', 'writer')

class FigureAdmin(admin.ModelAdmin):
    list_display = ('name', )
    list_filter = ('name', )
    list_per_page = 10

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', )
    list_filter = ('pub_date', )
    list_per_page = 10
    filter_horizontal = ('tag', )

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(BookBlock)
admin.site.register(BookTag)
admin.site.register(BookComment)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Figure, FigureAdmin)
admin.site.register(MovieComment)