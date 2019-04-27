from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework import routers, serializers, viewsets
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from .models import Article, Translation
from rest_framework.authtoken.models import Token

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions
from rest_framework import generics

from django_filters import rest_framework as filters

# Create your views here.

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'url')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserAnotherSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'url')

class CreateUser(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return False
        return True

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (CreateUser, )

class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class =  UserSerializer
    permission_classes = (IsOwner,)

class UserAnotherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class =  UserAnotherSerializer
    permission_classes = ()
 
class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    user = UserAnotherSerializer()
    class Meta:
        model = Article
        fields = ('url', 'id', 'title', 'description', 'pub_date', 'user', 'content')

class PublishArticle(permissions.BasePermission):

    def has_permission(self,  request, view):
        if request.method == 'POST':
            return permissions.IsAuthenticated
        return True

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
    permission_classes = (PublishArticle,)
    pagination_class = ArticlePagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ArticleFilter

class ReadArticle(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (ReadArticle,)

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
