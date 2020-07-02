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
   permission_classes = ()
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
    path('api/owner_articles/', ArticleOwnerList.as_view(), name='owner-article-list'),
    path('api/owner_articles/<int:pk>', ArticleOwnerDetail.as_view(), name='owner-article-detail'),
    path('api/articles/follow/', ArticleFollowList.as_view(), name='article-follow-list'),
    path('api/articles/<int:pk>', ArticleDetail.as_view(), name='article-detail'),
    path('api/comments/', CommentList.as_view(), name='comment-list'),
    path('api/comments/<int:pk>', CommentDetail.as_view(), name='comment-detail'),
    path('api/bookcomments/', BookCommentList.as_view(), name='bookcomment-list'),
    path('api/bookcomments/<int:pk>', BookCommentDetail.as_view(), name='bookcomment-detail'),
    path('api/moviecomments/', MovieCommentList.as_view(), name='moviecomment-list'),
    path('api/moviecomments/<int:pk>', MovieCommentDetail.as_view(), name='moviecomment-detail'),
    path('api/user/<int:pk>/follow/', follow, name='follow-user'),
    path('api/user/<int:pk>/unfollow/', unfollow, name='unfollow-user'),
    path('api/user/<int:pk>/is_followed/', isfollow, name='isfollow-user'),
    path('api/user/<int:pk>/apply_media_editor/', apply_media_editor, name='apply-media-editor'),
    path('api/user/<int:pk>/unapply_media_editor/', unapply_media_editor, name='unapply-media-editor'),
    path('api/books/', BookList.as_view(), name='book-list'),
    path('api/books/<int:pk>', BookDetail.as_view(), name='book-detail'),
    path('api/movies/', MovieList.as_view(), name='movie-list'),
    path('api/movies/<int:pk>', MovieDetail.as_view(), name='movie-detail'),
    path('api/figures/', FigureList.as_view(), name='figure-list'),
    path('api/figures/<int:pk>', FigureDetail.as_view(), name='figure-detail'),
    path('api/booktags/', BookTagList.as_view(), name='booktag-list'),
    path('api/booktags/<int:pk>', BookTagDetail.as_view(), name='booktag-detail'),
    path('api/bookblocks/', BookBlockList.as_view(), name='bookblock-list'),
    path('api/bookblocks/<int:pk>', BookBlockDetail.as_view(), name='bookblock-detail'),
    path('api/movietags/', MovieTagList.as_view(), name='movietag-list'),
    path('api/movietags/<int:pk>', MovieTagDetail.as_view(), name='movietag-detail'),
    path('api/movieblocks/', MovieBlockList.as_view(), name='movieblock-list'),
    path('api/movieblocks/<int:pk>', MovieBlockDetail.as_view(), name='movieblock-detail'),
    path('api/property_rank/', PropertyRank.as_view(), name='property-rank'),
    path('api/notices/', NoticeList.as_view(), name='notice-list'),
    path('api/follow_relations/', FollowRelaList.as_view(), name='follow-relations-list'),
    path('api/brands/', BrandList.as_view(), name='brnad-list'),
    path('api/brands/<int:pk>', BrandDetail.as_view(), name='brand-detail'),
    path('api/genres/', GenreList.as_view(), name='genre-list'),
    path('api/genres/<int:pk>', GenreDetail.as_view(), name='genre-detail'),
    path('api/cpus/', CPUList.as_view(), name='cpu-list'),
    path('api/cpus/<int:pk>', CPUDetail.as_view(), name='cpu-detail'),
    path('api/gpus/', GPUList.as_view(), name='gpu-list'),
    path('api/gpus/<int:pk>', GPUDetail.as_view(), name='gpu-detail'),
    path('api/computers/', ComputerList.as_view(), name='computer-list'),
    path('api/computers/<int:pk>', ComputerDetail.as_view(), name='computer-detail'),
    path('api/earphones/', EarphoneList.as_view(), name='earphone-list'),
    path('api/earphones/<int:pk>', EarphoneDetail.as_view(), name='earphone-detail'),
    path('api/phones/', PhoneList.as_view(), name='phone-list'),
    path('api/phones/<int:pk>', PhoneDetail.as_view(), name='phone-detail'),
    path('api/collections/', CollectionList.as_view(), name='collection-list'),
    path('api/collections/<int:pk>', CollectionDetail.as_view(), name='collection-detail'),
    path('api/owner_collections/', CollectionOwnerList.as_view(), name='collection-list'),
    path('api/owner_collections/<int:pk>', CollectionOwnerDetail.as_view(), name='collection-detail')
]
