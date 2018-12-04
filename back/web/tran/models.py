from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=256)
    description = models.CharField(max_length=512, default='description')
    content =  models.TextField()
    pub_date = models.DateTimeField('date published')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Translation(models.Model):
    title = models.CharField(max_length=50)
    content =  models.TextField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    pub_date = models.DateTimeField('date published')
    version = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
