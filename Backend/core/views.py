from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import AboutUs, News, Management, Vacancy
from .serializers import AboutUsSerializer, NewsListSerializer, NewsDetailSerializer, ManagementSerializer, VacancySerializer


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
    search_fields = ['title_ru', 'title_kg', 'title_en', 'content_ru', 'content_kg', 'content_en']


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
    search_fields = ['title_ru', 'title_kg', 'title_en', 'department_ru', 'department_kg', 'department_en']
