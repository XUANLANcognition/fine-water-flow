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

from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django_filters import rest_framework as filters

# Create your views here.

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'password', 'email', 'first_name')
    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        user = super(UserSerializer, self).update(instance, validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ArticleSerializerList(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('url', 'id', 'title', 'description', 'pub_date', 'user')

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('url', 'id', 'title', 'content', 'pub_date', 'user')

class ArticleFilter(filters.FilterSet):
    class Meta:
        model = Article
        fields = '__all__'

class ArticlePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Article
        fields = ('url', 'title', 'content')

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-pub_date')
    pagination_class = ArticlePagination

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticleSerializerList
        return ArticleSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ArticleFilter

class TranslateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Translation
        fields = ('url', 'id', 'title', 'content', 'article', 'user', 'pub_date')


class TranslationPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Translation
        fields = ('url', 'id', 'title', 'content', 'article', 'user')

class TranslationFilter(filters.FilterSet):
    class Meta:
        model = Translation
        fields = '__all__'

class TranslationViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = TranslateSerializer
    pagination_class = TranslationPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TranslationFilter

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
