from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('about/', views.AboutUsView.as_view(), name='about'),
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('news/latest/', views.NewsLatestView.as_view(), name='news-latest'),
    path('news/<slug:slug>/', views.NewsDetailView.as_view(), name='news-detail'),
    path('management/', views.ManagementListView.as_view(), name='management-list'),
    path('vacancies/', views.VacancyListView.as_view(), name='vacancy-list'),
    path('gallery/', views.GalleryAlbumListView.as_view(), name='gallery-list'),
    path('video-gallery/', views.VideoGalleryListView.as_view(), name='video-gallery-list'),
    path('contact/', views.ContactMessageCreateView.as_view(), name='contact-create'),
]
