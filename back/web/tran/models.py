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

    @receiver(post_save, sender = User)
    def create_profile_for_user(sender, instance = None, created = False, **kwargs):
        if created:
            Profile.objects.get_or_create(user = instance)

    @receiver(pre_delete, sender = User)
    def delete_profile_for_user(sender, instance = None, **kwargs):
        if instance:
            user_profile = Profile.objects.get(user = instance)
            user_profile.delete()

class Translation(models.Model):
    title = models.CharField(max_length=50)
    content =  models.TextField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    pub_date = models.DateTimeField('date published')
    version = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
