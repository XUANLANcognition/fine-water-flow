from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework import routers, serializers, viewsets
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from .models import Article, Comment, Profile
from rest_framework.authtoken.models import Token

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions
from rest_framework import generics
from rest_framework import filters as filter_drf

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

    def has_permission(self,  request, view):
        if request.method == 'POST':
            return permissions.IsAuthenticated
        return True


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
        fields = ('bio', 'follow',)


class UserSerializer(serializers.HyperlinkedModelSerializer): 
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'url','profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            profile_data = validated_data.pop('profile')
            profile = instance.profile
            profile.bio = profile_data.get('bio', profile.bio)
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


class UserAnotherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class =  UserAnotherSerializer
    permission_classes = ()


# Article API


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    user = UserAnotherSerializer(read_only = True)

    class Meta:
        model = Article
        fields = ('url', 'id', 'title', 'description', 'pub_date', 'user', 'content')


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
    queryset = Article.objects.all().order_by('-pub_date')
    serializer_class = ArticleSerializer
    permission_classes = (Publish,)
    pagination_class = ArticlePagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ArticleFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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
    filter_backends = (ArticleFollowFilter,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (Read,)


# Comment API


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserAnotherSerializer(read_only = True)

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
    queryset = Comment.objects.all().order_by('-pub_date')
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
        })
