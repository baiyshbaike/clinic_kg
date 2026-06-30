from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import AboutUs, News, Management, Vacancy, GalleryAlbum, VideoGallery, ContactMessage
from .serializers import AboutUsSerializer, NewsListSerializer, NewsDetailSerializer, ManagementSerializer, VacancySerializer, GalleryAlbumSerializer, VideoGallerySerializer, ContactMessageSerializer


class AboutUsView(generics.RetrieveAPIView):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer

    def get_object(self):
        return AboutUs.load()


class NewsPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 50


class NewsListView(generics.ListAPIView):
    queryset = News.objects.filter(status=True)
    serializer_class = NewsListSerializer
    pagination_class = NewsPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title_ru', 'title_kg', 'content_ru', 'content_kg']


class NewsLatestView(generics.ListAPIView):
    queryset = News.objects.filter(status=True)[:3]
    serializer_class = NewsListSerializer
    pagination_class = None


class NewsDetailView(generics.RetrieveAPIView):
    queryset = News.objects.filter(status=True)
    serializer_class = NewsDetailSerializer
    lookup_field = 'slug'


class ManagementListView(generics.ListAPIView):
    queryset = Management.objects.filter(status=True)
    serializer_class = ManagementSerializer
    pagination_class = None


class VacancyListView(generics.ListAPIView):
    queryset = Vacancy.objects.filter(status=True)
    serializer_class = VacancySerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ['title_ru', 'title_kg', 'department_ru', 'department_kg']


class GalleryAlbumListView(generics.ListAPIView):
    queryset = GalleryAlbum.objects.filter(status=True)
    serializer_class = GalleryAlbumSerializer
    pagination_class = None


class VideoGalleryListView(generics.ListAPIView):
    queryset = VideoGallery.objects.filter(status=True)
    serializer_class = VideoGallerySerializer
    pagination_class = None


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_client_ip(self):
        x_forwarded = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded:
            return x_forwarded.split(',')[0].strip()
        return self.request.META.get('REMOTE_ADDR')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'ip_address': self.get_client_ip()})
        serializer.is_valid(raise_exception=True)
        serializer.save(ip_address=self.get_client_ip())
        return Response({'success': True, 'message': 'Сообщение отправлено!'}, status=status.HTTP_201_CREATED)
