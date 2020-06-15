from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete

# Create your models here.

class Source(models.Model):
    title = models.CharField(max_length=128)
    plantform = models.CharField(max_length=128, default='')
    url = models.CharField(max_length=128)

    def __str__(self):
        return '%s-%s' % (self.title, self.plantform)

class Picture(models.Model):
    title = models.CharField(max_length=128)
    url = models.CharField(max_length=128)

    def __str__(self):
        return '%s' % (self.title)

class Article(models.Model):
    title = models.CharField(max_length=256)
    description = models.CharField(max_length=512, default='description')
    content =  models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    views = models.IntegerField(default=0)
    ORIGINALITY_CHOICES = (
        ('Y', '原创'),
        ('N', '非原创')
    )
    originality = models.CharField(max_length=24, choices=ORIGINALITY_CHOICES, default='N', blank=True)
    STATUS_CHOICES = (
        ('1', '草稿'),
        ('2', '发布')
    )
    status = models.CharField(max_length=24, choices=STATUS_CHOICES, default='1', blank=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=100, blank=True, default='I am just a baby.')
    follow = models.ManyToManyField('Profile', related_name='followed_by', blank=True)
    MEDIA_EDITOR_AUTH_CHOICES = (
        ('未审核', '未审核'),
        ('审核中', '审核中'),
        ('审核通过', '审核通过')
    )
    property = models.IntegerField(default=100)
    media_editor_auth = models.CharField(max_length=24, choices=MEDIA_EDITOR_AUTH_CHOICES, default='未审核', blank=True)
    profession = models.CharField(max_length=24, blank=True)
    cover = models.CharField(max_length=100, blank=True, default='/cover.png')

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
    subtitle = models.CharField(max_length=128, default='', blank=True)
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

class MovieBlock(models.Model):
    title = models.CharField(max_length=128)

    def __str__(self):
        return '%s' % (self.title)

class MovieTag(models.Model):
    title = models.CharField(max_length=128)
    block = models.ForeignKey(MovieBlock, on_delete=models.CASCADE, related_name='tags', default='')

    def __str__(self):
        return '%s' % (self.title)

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
    tag = models.ManyToManyField('Movietag', related_name='movietag', blank=True)
    still = models.ManyToManyField('Picture', related_name='still', blank=True)
    play_source = models.ManyToManyField('Source', related_name='play_source', blank=True)

class MovieComment(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    content = models.CharField(max_length=1024)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)

class Notice(models.Model):
    content =  models.TextField()
    release_date = models.DateTimeField()
    TAB_CHOICES = (
        ('修复BUG', 'fix'),
        ('增加新功能', 'function'),
        ('优化功能或显示', 'optimize'),
        ('修改文案', 'document'),
        ('重大改动', 'boom'),
        ('诞生', 'birthday')
    )
    tab = models.CharField(max_length=24, choices=TAB_CHOICES)

class FollowRela(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    follow = models.ForeignKey(User, on_delete=models.PROTECT, related_name='follow')
    pub_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'follow']

    def __str__(self):
        return '%s' % (self.user.username)

class Brand(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=128)
    pub_date = models.DateTimeField(auto_now_add=True)
    icon = models.CharField(max_length=128)

    def __str__(self):
        return '%s' % (self.name)

class Genre(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=128)
    pub_date = models.DateTimeField(auto_now_add=True)
    icon = models.CharField(max_length=128)

    def __str__(self):
        return '%s' % (self.name)

class Computer(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=256)
    price = models.IntegerField(blank=True)
    ttm = models.DateTimeField(blank=True, null=True)
    cpu = models.ManyToManyField('CPU', related_name='cpu', blank=True)
    gpu = models.ManyToManyField('GPU', related_name='gpu', blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    def __str__(self):
        return '%s' % (self.name)

class CPU(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=128)
    ttm = models.DateField(blank=True, null=True)
    brand_v = (
        ('AMD', 'AMD'),
        ('英特尔', 'InteI'),
        ('高通', '高通'),
        ('华为', '华为'),
        ('联发科技', '联发科'),
        ('Apple', '苹果')
    )
    brand = models.CharField(max_length=12, choices=brand_v, blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % (self.name)

class GPU(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=128)
    ttm = models.DateField(blank=True, null=True)
    brand_v = (
        ('AMD', 'AMD'),
        ('英伟达 NVIDIA', 'NVIDIA')
    )
    brand = models.CharField(max_length=12, choices=brand_v, blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % (self.name)

class Earphone(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=256)
    price = models.IntegerField(blank=True)
    ttm = models.DateTimeField(blank=True, null=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    api_v = (
        ('有线', '有线'),
        ('蓝牙', '蓝牙')
    )
    api = models.CharField(max_length=32, choices=api_v, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    def __str__(self):
        return '%s' % (self.name)

class Phone(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=256)
    price = models.IntegerField(blank=True)
    ttm = models.DateTimeField(blank=True, null=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    cpu = models.ManyToManyField('CPU', related_name='pcpu', blank=True)
    os_v = (
        ('Android', 'Android'),
        ('IOS', 'IOS'),
    )
    os = models.CharField(max_length=12, choices=os_v, blank=True)
    screen_type_v = (
        ('刘海屏', '刘海屏'),
        ('挖空屏', '挖空屏'),
        ('全面屏', '全面屏')
    )
    screen_type = models.CharField(max_length=12, choices=screen_type_v, blank=True)

    def __str__(self):
        return '%s' % (self.name)
