"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include, url
from rest_framework import routers, serializers, viewsets, permissions
from django.contrib.auth.models import User
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.decorators import permission_classes

from tran.views import *


router = routers.DefaultRouter()


schema_view = get_schema_view(
   openapi.Info(
      title="Non Machine Translate",
      default_version='v1.0.0',
      description="非机翻的好看的后端接口文档",
   ),
   public=True,
   permission_classes = (permissions.IsAuthenticated)
)


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'api/', include(router.urls)),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', CustomAuthToken.as_view()),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/users/', UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>', UserDetail.as_view(), name='user-detail'),
    path('api/user/<int:pk>', UserAnotherDetail.as_view(), name='user-detail'),
    path('api/articles/', ArticleList.as_view(), name='article-list'),
    path('api/articles/follow/', ArticleFollowList.as_view(), name='article-follow-list'),
    path('api/articles/<int:pk>', ArticleDetail.as_view(), name='article-detail'),
    path('api/comments/', CommentList.as_view(), name='comment-list'),
    path('api/comments/<int:pk>', CommentDetail.as_view(), name='comment-detail'),
    path('api/user/<int:pk>/follow/', follow, name='follow-user'),
    path('api/user/<int:pk>/unfollow/', unfollow, name='unfollow-user')
]
