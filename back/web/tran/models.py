from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=256)
    description = models.CharField(max_length=512, default='description')
    content =  models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=100, blank=True, default='I am just a baby.')
    follow = models.ManyToManyField('Profile', related_name='followed_by', blank=True)

    @receiver(post_save, sender = User)
    def create_profile_for_user(sender, instance = None, created = False, **kwargs):
        if created:
            Profile.objects.get_or_create(user = instance)

    @receiver(pre_delete, sender = User)
    def delete_profile_for_user(sender, instance = None, **kwargs):
        if instance:
            user_profile = Profile.objects.get(user = instance)
            user_profile.delete()

class Comment(models.Model):
    content = models.CharField(max_length=1024)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)

class Figure(models.Model):
    name = models.CharField(max_length=128)
    birthday = models.DateField(blank=True, null=True)
    deathday = models.DateField(blank=True, null=True)
    GENDER_CHOICES = (
        ('M', 'Homme'),
        ('F', 'Femme'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    place = models.CharField(max_length=128, blank=True)
    cover = models.CharField(max_length=128, blank=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % (self.name)

class BookBlock(models.Model):
    title = models.CharField(max_length=128)

    def __str__(self):
        return '%s' % (self.title)

class BookTag(models.Model):
    title = models.CharField(max_length=128)
    block = models.ForeignKey(BookBlock, on_delete=models.CASCADE, related_name='tags', default='')

    def __str__(self):
        return '%s' % (self.title)

class Book(models.Model):
    title = models.CharField(max_length=256)
    overview =  models.TextField(default='')
    author = models.CharField(max_length=256)
    publisher = models.CharField(max_length=256)
    isbn = models.CharField(max_length=256)
    pages = models.IntegerField()
    cover = models.CharField(max_length=256, blank=True, default='')
    pub_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag = models.ManyToManyField('Booktag', related_name='booktag', blank=True)

class BookComment(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.CharField(max_length=1024)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)

class Movie(models.Model):
    title = models.CharField(max_length=256)
    director = models.ManyToManyField('Figure', related_name='director', blank=True)
    writer = models.ManyToManyField('Figure', related_name='write', blank=True)
    actor = models.ManyToManyField('Figure', related_name='actor', blank=True)
    region = models.CharField(max_length=256, blank=True)
    number = models.IntegerField(blank=True)
    runtime = models.IntegerField(blank=True)
    overview =  models.TextField(default='', blank=True)
    cover = models.CharField(max_length=256, blank=True, default='')
    pub_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

class MovieComment(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    content = models.CharField(max_length=1024)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)
