from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework import routers, serializers, viewsets, status
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from .models import Article, Comment, Profile, Book, BookTag, BookBlock, BookComment, Figure, Movie, MovieComment, MovieBlock, MovieTag, Picture, Source, Notice, FollowRela, Brand, Genre,Computer, CPU, GPU, Earphone, Phone, Collection, Like
from rest_framework.authtoken.models import Token
from django.conf import settings

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions
from rest_framework import generics
from rest_framework import filters as filter_drf
from django.core.mail import send_mail
import json

from django_filters import rest_framework as filters

# permission


class CreateUser(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return False
        return True


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj


class Read(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class Publish(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return permissions.IsAuthenticated
        return True


class MediaPublish(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            if permissions.IsAuthenticated:
                if request.user.is_authenticated:
                    return (request.user.profile.media_editor_auth == '审核通过')
                else:
                    return False
            else:
                return False
        return True


# Picture API

class PictureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Picture
        fields = ('url', 'id', 'title')


# PlaySource API

class SourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Source
        fields = ('url', 'id', 'title', 'plantform')


# User API


class FollowerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    last_name = serializers.CharField(source='user.last_name')
    id = serializers.CharField(source='user.id')

    class Meta:
        model = Profile
        fields = ('username', 'last_name', 'id', 'bio')


class UserProfileSerializer(serializers.ModelSerializer):
    follow = FollowerSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ('bio', 'media_editor_auth', 'property', 'follow', 'profession', 'cover')
        read_only_fields = ('property', )


class UserProfileBriefSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('bio', 'media_editor_auth', 'property', 'profession', 'cover')
        read_only_fields = ('property', )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'url', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        subject = '欢迎 Welcome!'
        message = '%s, 欢迎加入 Fine Water Flow 社区，感谢您的支持。\n ( ゜- ゜)つロ乾杯~ \n\n 这是一封自动发送的邮件，请不要直接回复' % (user.username,)
        from_email = settings.EMAIL_FROM
        if subject and message and from_email:
            try:
                send_mail(subject, message, from_email, [user.email])
            except BadHeaderError:
                pass
        else:
            pass
        return user

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            profile_data = validated_data.pop('profile')
            profile = instance.profile
            profile.bio = profile_data.get('bio', profile.bio)
            profile.profession = profile_data.get('profession', profile.profession)
            profile.cover = profile_data.get('cover', profile.cover)
            profile.save()
        return super(UserSerializer, self).update(instance, validated_data)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (CreateUser, )


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class =  UserSerializer
    permission_classes = (IsOwner,)


class UserAnotherSerializer(serializers.HyperlinkedModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'url', 'id', 'profile')
        read_only_fields = ('username', 'first_name', 'last_name', 'url', 'id', 'profile')


class UserBriefSerializer(serializers.ModelSerializer):
    profile = UserProfileBriefSerializer()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'url', 'username', 'profile')
        read_only_fields = ('username', 'first_name', 'last_name', 'url', 'id', 'profile')


class UserAnotherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class =  UserAnotherSerializer
    permission_classes = ()


class PropertyRankSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    last_name = serializers.CharField(source='user.last_name')
    id = serializers.CharField(source='user.id')

    class Meta:
        model = Profile
        fields = ('username', 'last_name', 'id', 'bio', 'property', 'media_editor_auth')


class PropertyRank(generics.ListAPIView):
    queryset = Profile.objects.all().order_by('-property')[:5]
    serializer_class = PropertyRankSerializer
    permission_classes = ()


# user follow user

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated, ))
def follow(request, pk):
    try:
        user = User.objects.get(id = request.user.id)
        follow = User.objects.get(id = pk)
    except Exception as e:
        return Response({'code': '3', 'message': 'user or follower does not exist.'})
    try:
        follow_rela = FollowRela.objects.get(user = user, follow = follow)
        return Response({'code': '2', 'message': 'have followed'})
    except Exception as e:
        follow_rela = FollowRela(user = user, follow = follow)
        follow_rela.save()
    return Response({'code': '1', 'message': 'succeed'})

#user unfollow user

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated, ))
def unfollow(request, pk):
    try:
        user = User.objects.get(id = request.user.id)
        follow = User.objects.get(id = pk)
    except Exception as e:
        return Response({'code': '3', 'message': 'user or follower does not exist.'})
    try:
        follow_rela = FollowRela.objects.get(user = user, follow = follow)
        follow_rela.delete()
        return Response({'code': '1', 'message': 'succeed'})
    except Exception as e:
        return Response({'code': '2', 'message': 'have unfollowed'})

# user apply media editor

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated, ))
def apply_media_editor(request, pk):
    user = User.objects.get(id = request.user.id)
    user.profile.media_editor_auth = '审核中'
    user.profile.save()
    return Response(status = status.HTTP_201_CREATED)

# user unapply media editor

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated, ))
def unapply_media_editor(request, pk):
    user = User.objects.get(id = request.user.id)
    user.profile.media_editor_auth = '未审核'
    user.profile.save()
    return Response(status = status.HTTP_201_CREATED)

# conclude followed or not

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated, ))
def isfollow(request, pk):
    try:
        user = User.objects.get(id = request.user.id)
        follow = User.objects.get(id = pk)
    except Exception as e:
        return Response({'code': '3', 'message': 'user or follower does not exist.'})
    try:
        follow_rela = FollowRela.objects.get(user= user, follow = follow)
        return Response({'code':'1', 'message': 'followed'})
    except Exception as e1:
        return Response({'code':'2', 'message': 'unfollowed'})


# Article API


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    user = UserBriefSerializer(read_only = True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'url', 'originality', 'pub_date', 'views', 'description', 'content', 'user', 'status', 'cover')


class ArticlePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Article
        fields = '__all__'


class ArticleFilter(filters.FilterSet):
    
    class Meta:
        model = Article
        fields = '__all__'


class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all().filter(status='2').order_by('-pub_date')
    serializer_class = ArticleSerializer
    permission_classes = (Publish,)
    pagination_class = ArticlePagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    filterset_class = ArticleFilter
    search_fields = ('title', 'content')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ArticleOwnerFilter(filter_drf.BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        return queryset.filter(user=request.user)


class ArticleOwnerList(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-pub_date')
    serializer_class = ArticleSerializer
    pagination_class = ArticlePagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter, ArticleOwnerFilter)
    filterset_class = ArticleFilter
    search_fields = ('title', 'content')
    permission_classes= (IsOwner, )


class ArticleFollowFilter(filter_drf.BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        follow = request.user.profile.follow.all()
        followList = [item.user_id for item in follow]
        return queryset.filter(user_id__in=followList)


class ArticleFollowList(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-pub_date')
    serializer_class = ArticleSerializer
    permission_classes = (Publish,)
    pagination_class = ArticlePagination
    filter_backends = (ArticleFollowFilter, filters.DjangoFilterBackend)


class ArticleOwnerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (Read,)
    filter_backends = (ArticleOwnerFilter,)


class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all().filter(status='2')
    serializer_class = ArticleSerializer
    permission_classes = (Read,)

    def get(self, request, *args, **kwargs):
        article = Article.objects.get(id = kwargs['pk'])
        article.views = article.views + 1
        article.save()
        return self.retrieve(request, *args, **kwargs)


# BookComment API


class BookCommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserBriefSerializer(read_only = True)

    class Meta:
        model = BookComment
        fields = ('url', 'id', 'content', 'pub_date', 'user', 'book')


class BookCommentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = BookComment
        fields = '__all__'


class BookCommentFilter(filters.FilterSet):

    class Meta:
        model = BookComment
        fields = "__all__"


class BookCommentList(generics.ListCreateAPIView):
    queryset = BookComment.objects.all().order_by('pub_date')
    serializer_class = BookCommentSerializer
    permission_classes = (Publish, )
    pagination_class = BookCommentPagination
    filter_backends = (filters.DjangoFilterBackend, )
    filterset_class = BookCommentFilter

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class BookCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookComment.objects.all()
    serializer_class = BookCommentSerializer
    permission_classes = (Read, )


# BookTag API


class BookTagSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = BookTag
        fields = ('title', 'id')


class BookTagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookTag.objects.all()
    serializer_class = BookTagSerializer
    permission_classes = (Read,)


class BookTagList(generics.ListCreateAPIView):
    queryset = BookTag.objects.all()
    serializer_class = BookTagSerializer
    permission_classes = (Publish,)


# BookBlock API


class BookBlockSerializer(serializers.HyperlinkedModelSerializer):
    tags = BookTagSerializer(many=True, read_only=True)

    class Meta:
        model = BookBlock
        fields = ('title','tags')


class BookBlockDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookBlock.objects.all()
    serializer_class = BookBlockSerializer
    permission_classes = (Read,)


class BookBlockList(generics.ListCreateAPIView):
    queryset = BookBlock.objects.all()
    serializer_class = BookBlockSerializer
    permission_classes = (Publish,)


# Book API


class BookSerializer(serializers.HyperlinkedModelSerializer):
    tag = BookTagSerializer(many=True, read_only=True)
    user = UserBriefSerializer(read_only = True)

    class Meta:
        model = Book
        fields = ('url', 'id', 'title', 'subtitle', 'overview', 'author', 'publisher', 'isbn', 'pages', 'cover', 'pub_date', 'user', 'tag')


class BookPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Book
        fields = '__all__'


class BookFilter(filters.FilterSet):
    
    class Meta:
        model = Book
        fields = '__all__'


class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all().order_by('-pub_date')
    serializer_class = BookSerializer
    permission_classes = (MediaPublish,)
    pagination_class = BookPagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    search_fields = ('title', )
    filterset_class = BookFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        self.request.user.profile.property = self.request.user.profile.property + 5
        self.request.user.profile.save()


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (Read,)


# Comment API


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserBriefSerializer(read_only = True)

    class Meta:
        model = Comment
        fields = ('url', 'id', 'content', 'pub_date', 'user', 'article')


class CommentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Comment
        fields = '__all__'


class CommentFilter(filters.FilterSet):

    class Meta:
        model = Comment
        fields = "__all__"


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all().order_by('pub_date')
    serializer_class = CommentSerializer
    permission_classes = (Publish, )
    pagination_class = CommentPagination
    filter_backends = (filters.DjangoFilterBackend, )
    filterset_class = CommentFilter

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (Read, )


# Figure API


class FigureSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Figure
        fields = ('url', 'id', 'name', 'birthday', 'deathday', 'gender', 'place', 'cover')


class FigurePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Figure
        fields = '__all__'


class FigureFilter(filters.FilterSet):
    
    class Meta:
        model = Figure
        fields = '__all__'


class FigureList(generics.ListCreateAPIView):
    queryset = Figure.objects.all().order_by('-pub_date')
    serializer_class = FigureSerializer
    permission_classes = (Publish,)
    pagination_class = FigurePagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FigureFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FigureDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Figure.objects.all()
    serializer_class = FigureSerializer
    permission_classes = (Read,)


# MovieTag API


class MovieTagSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = MovieTag
        fields = ('title', 'id')


class MovieTagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MovieTag.objects.all()
    serializer_class = MovieTagSerializer
    permission_classes = (Read,)


class MovieTagList(generics.ListCreateAPIView):
    queryset = MovieTag.objects.all()
    serializer_class = MovieTagSerializer
    permission_classes = (Publish,)


# MovieBlock API


class MovieBlockSerializer(serializers.HyperlinkedModelSerializer):
    tags = MovieTagSerializer(many=True, read_only=True)

    class Meta:
        model = MovieBlock
        fields = ('title','tags')


class MovieBlockDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MovieBlock.objects.all()
    serializer_class = MovieBlockSerializer
    permission_classes = (Read,)


class MovieBlockList(generics.ListCreateAPIView):
    queryset = MovieBlock.objects.all()
    serializer_class = MovieBlockSerializer
    permission_classes = (Publish,)


# Movie API


class MovieSerializer(serializers.HyperlinkedModelSerializer):
    director = FigureSerializer(many=True, read_only=True)
    actor = FigureSerializer(many=True, read_only=True)
    writer = FigureSerializer(many=True, read_only=True)
    user = UserBriefSerializer(read_only = True)
    tag = BookTagSerializer(many=True, read_only=True)
    still = PictureSerializer(many=True, read_only=True)
    play_source = SourceSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ('url', 'id', 'title' , 'cover', 'number', 'runtime' ,'region','director','writer', 'actor', 'tag','overview', 'user', 'still', 'play_source')


class MoviePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Movie
        fields = '__all__'


class MovieFilter(filters.FilterSet):
    
    class Meta:
        model = Movie
        fields = '__all__'


class MovieList(generics.ListCreateAPIView):
    queryset = Movie.objects.all().order_by('-pub_date')
    serializer_class = MovieSerializer
    permission_classes = (MediaPublish,)
    pagination_class = MoviePagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    search_fields = ('title', )
    filterset_class = MovieFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        self.request.user.profile.property = self.request.user.profile.property + 5
        self.request.user.profile.save()


class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = (Read,)


# MovieComment API


class MovieCommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserBriefSerializer(read_only = True)

    class Meta:
        model = MovieComment
        fields = ('url', 'id', 'content', 'pub_date', 'user', 'movie')


class MovieCommentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = MovieComment
        fields = '__all__'


class MovieCommentFilter(filters.FilterSet):

    class Meta:
        model = MovieComment
        fields = "__all__"


class MovieCommentList(generics.ListCreateAPIView):
    queryset = MovieComment.objects.all().order_by('pub_date')
    serializer_class = MovieCommentSerializer
    permission_classes = (Publish, )
    pagination_class = MovieCommentPagination
    filter_backends = (filters.DjangoFilterBackend, )
    filterset_class = MovieCommentFilter

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class MovieCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MovieComment.objects.all()
    serializer_class = MovieCommentSerializer
    permission_classes = (Read, )


# Notice API

class NoticePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Notice
        fields = '__all__'


class NoticeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Notice
        fields = ('id', 'content', 'release_date', 'tab')


class NoticeList(generics.ListAPIView):
    queryset = Notice.objects.all().order_by('-release_date')
    serializer_class = NoticeSerializer
    permission_classes = (Publish,)
    pagination_class = NoticePagination


# FollowRela API


class FollowRelaSerializer(serializers.HyperlinkedModelSerializer):
    follow = UserBriefSerializer(read_only = True)
    user = UserBriefSerializer(read_only = True)


    class Meta:
        model = FollowRela
        fields = ('id', 'user', 'follow')
        read_only_fields = ('id', 'user', 'follow')


class FollowRelaPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = FollowRela
        fields = '__all__'

 
class FollowRelaFilter(filters.FilterSet):

    class Meta:
        model = FollowRela
        fields = '__all__'


class FollowRelaList(generics.ListCreateAPIView):
    queryset = FollowRela.objects.all()
    serializer_class = FollowRelaSerializer
    permission_classes = ()
    pagination_class = FollowRelaPagination
    filterset_class = FollowRelaFilter
    filter_backends = (filters.DjangoFilterBackend, )


# Brand API


class BrandSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Brand
        fields = ('url', 'id', 'name', 'icon')


class BrandPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Brand
        fields = '__all__'


class BrandFilter(filters.FilterSet):
    
    class Meta:
        model = Brand
        fields = '__all__'


class BrandList(generics.ListCreateAPIView):
    queryset = Brand.objects.all().order_by('-pub_date')
    serializer_class = BrandSerializer
    permission_classes = (Publish,)
    pagination_class = BrandPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BrandFilter


class BrandDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = (Read,)


# Genre API


class GenreSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Genre
        fields = ('url', 'id', 'name', 'icon')


class GenrePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Genre
        fields = '__all__'


class GenreFilter(filters.FilterSet):
    
    class Meta:
        model = Genre
        fields = '__all__'


class GenreList(generics.ListCreateAPIView):
    queryset = Genre.objects.all().order_by('-pub_date')
    serializer_class = GenreSerializer
    permission_classes = (Publish,)
    pagination_class = GenrePagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = GenreFilter


class GenreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = (Read,)


# CPU API


class CPUSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = CPU
        fields = ('url', 'id', 'name', 'ttm', 'brand')


class CPUPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = CPU
        fields = '__all__'


class CPUFilter(filters.FilterSet):
    
    class Meta:
        model = CPU
        fields = '__all__'


class CPUList(generics.ListCreateAPIView):
    queryset = CPU.objects.all().order_by('-pub_date')
    serializer_class = CPUSerializer
    permission_classes = (Publish,)
    pagination_class = CPUPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CPUFilter


class CPUDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CPU.objects.all()
    serializer_class = CPUSerializer
    permission_classes = (Read,)


# GPU API


class GPUSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = GPU
        fields = ('url', 'id', 'name', 'ttm', 'brand')


class GPUPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = GPU
        fields = '__all__'


class GPUFilter(filters.FilterSet):
    
    class Meta:
        model = GPU
        fields = '__all__'


class GPUList(generics.ListCreateAPIView):
    queryset = GPU.objects.all().order_by('-pub_date')
    serializer_class = GPUSerializer
    permission_classes = (Publish,)
    pagination_class = GPUPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = GPUFilter


class GPUDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GPU.objects.all()
    serializer_class = GPUSerializer
    permission_classes = (Read,)

# Computer API


class ComputerSerializer(serializers.HyperlinkedModelSerializer):
    brand = BrandSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    cpu = CPUSerializer(many=True, read_only=True)
    gpu = GPUSerializer(many=True, read_only=True)

    class Meta:
        model = Computer
        fields = ('url', 'id', 'name', 'price', 'ttm', 'brand' ,'genre', 'cpu', 'gpu')


class ComputerPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Computer
        fields = '__all__'


class ComputerFilter(filters.FilterSet):
    
    class Meta:
        model = Computer
        fields = '__all__'


class ComputerList(generics.ListCreateAPIView):
    queryset = Computer.objects.all().order_by('-pub_date')
    serializer_class = ComputerSerializer
    permission_classes = (MediaPublish,)
    pagination_class = ComputerPagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    search_fields = ('title', )
    filterset_class = ComputerFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        self.request.user.profile.property = self.request.user.profile.property + 5
        self.request.user.profile.save()


class ComputerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Computer.objects.all()
    serializer_class = ComputerSerializer
    permission_classes = (Read,)


# Earphone API


class EarphoneSerializer(serializers.HyperlinkedModelSerializer):
    brand = BrandSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)

    class Meta:
        model = Earphone
        fields = ('url', 'id', 'name', 'price', 'ttm', 'brand' ,'genre', 'api')


class EarphonePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Earphone
        fields = '__all__'


class EarphoneFilter(filters.FilterSet):
    
    class Meta:
        model = Earphone
        fields = '__all__'


class EarphoneList(generics.ListCreateAPIView):
    queryset = Earphone.objects.all().order_by('-pub_date')
    serializer_class = EarphoneSerializer
    permission_classes = (MediaPublish,)
    pagination_class = EarphonePagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    search_fields = ('title', )
    filterset_class = EarphoneFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        self.request.user.profile.property = self.request.user.profile.property + 5
        self.request.user.profile.save()


class EarphoneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Earphone.objects.all()
    serializer_class = EarphoneSerializer
    permission_classes = (Read,)


# Phone API


class PhoneSerializer(serializers.HyperlinkedModelSerializer):
    brand = BrandSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    cpu = CPUSerializer(many=True, read_only=True)

    class Meta:
        model = Phone
        fields = ('url', 'id', 'name', 'price', 'ttm', 'brand' ,'genre', 'cpu', 'os', 'screen_type')


class PhonePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Phone
        fields = '__all__'


class PhoneFilter(filters.FilterSet):
    
    class Meta:
        model = Phone
        fields = '__all__'


class PhoneList(generics.ListCreateAPIView):
    queryset = Phone.objects.all().order_by('-pub_date')
    serializer_class = PhoneSerializer
    permission_classes = (MediaPublish,)
    pagination_class = PhonePagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    search_fields = ('title', )
    filterset_class = PhoneFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        self.request.user.profile.property = self.request.user.profile.property + 5
        self.request.user.profile.save()


class PhoneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer
    permission_classes = (Read,)


# Collection API


class ArticleBriefSerializer(serializers.HyperlinkedModelSerializer):
    user = UserBriefSerializer(read_only = True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'url', 'originality', 'pub_date', 'views', 'description', 'user', 'status')


class CollectionSerializer(serializers.HyperlinkedModelSerializer):
    article = ArticleBriefSerializer(many=True, read_only=True)
    user = UserBriefSerializer(read_only = True)

    class Meta:
        model = Collection
        fields = ('url', 'id', 'name', 'user', 'pub_date', 'article', 'status', 'views')


class CollectionPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Collection
        fields = '__all__'


class CollectionFilter(filters.FilterSet):
    
    class Meta:
        model = Collection
        fields = '__all__'


class CollectionOwnerFilter(filter_drf.BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        return queryset.filter(user=request.user)


class CollectionList(generics.ListCreateAPIView):
    queryset = Collection.objects.all().filter(status='2').order_by('-pub_date')
    serializer_class = CollectionSerializer
    permission_classes = (Publish,)
    pagination_class = CollectionPagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    search_fields = ('name', )
    filterset_class = CollectionFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        try:
            data = json.loads(self.request.data['articles'])
            article_list = Article.objects.filter(id__in = data)
            serializer.save(article = article_list)
        except Exception as e:
            pass


class CollectionOwnerList(generics.ListAPIView):
    queryset = Collection.objects.all().order_by('-pub_date')
    serializer_class = CollectionSerializer
    pagination_class = CollectionPagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter, CollectionOwnerFilter)
    filterset_class = CollectionFilter
    search_fields = ('title', 'content')
    permission_classes= (IsOwner, )


class CollectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collection.objects.all().filter(status='2')
    serializer_class = CollectionSerializer
    permission_classes = (Read,)

    def get(self, request, *args, **kwargs):
        collection = Collection.objects.get(id = kwargs['pk'])
        collection.views = collection.views + 1
        collection.save()
        return self.retrieve(request, *args, **kwargs)


class CollectionOwnerDetail(generics. RetrieveUpdateDestroyAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = (Read,)
    filter_backends = (CollectionOwnerFilter,)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        try:
            data = json.loads(self.request.data['articles'])
            article_list = Article.objects.filter(id__in = data)
            serializer.save(article = article_list)
        except Exception as e:
            pass
        self.perform_update(serializer)
        return Response(serializer.data)


# Like API

class LikeSerializer(serializers.HyperlinkedModelSerializer):
    user = UserBriefSerializer(read_only = True)
    article = ArticleBriefSerializer(read_only=True)

    class Meta:
        model = Like
        fields = ('id', 'user', 'article', 'pub_date')

class LikePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Like
        fields = '__all__'


class LikeFilter(filters.FilterSet):
    
    class Meta:
        model = Like
        fields = '__all__'

class LikeList(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (Publish,)
    pagination_class = LikePagination
    filter_backends = (filters.DjangoFilterBackend, filter_drf.SearchFilter)
    search_fields = ('name', )
    filterset_class = LikeFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        try:
            data = json.loads(self.request.data['article'])
            article = Article.objects.get(id = data)
            serializer.save(article = article)
        except Exception as e:
            pass


class LikeDetail(generics.RetrieveDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (Read,)


# Sign on API


class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'user_name': user.username,
            'user_avatar': user.last_name,
        })