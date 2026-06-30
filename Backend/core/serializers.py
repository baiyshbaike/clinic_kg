from rest_framework import serializers
from .models import AboutUs, News, NewsImage, Management, Vacancy


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ('id', 'title_kg', 'title_ru', 'content_kg', 'content_ru', 'status', 'created')


class NewsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsImage
        fields = ('id', 'image', 'main_image', 'created')


class NewsListSerializer(serializers.ModelSerializer):
    images = NewsImageSerializer(many=True, read_only=True)
    main_image_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ('id', 'title_kg', 'title_ru', 'content_kg', 'content_ru', 'status', 'created', 'slug', 'images', 'main_image_url')

    def get_main_image_url(self, obj):
        main_image = obj.images.filter(main_image=True).first()
        if main_image and main_image.image:
            return self.context['request'].build_absolute_uri(main_image.image.url)
        first_image = obj.images.first()
        if first_image and first_image.image:
            return self.context['request'].build_absolute_uri(first_image.image.url)
        return None


class NewsDetailSerializer(serializers.ModelSerializer):
    images = NewsImageSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = ('id', 'title_kg', 'title_ru', 'content_kg', 'content_ru', 'status', 'created', 'slug', 'images')


class ManagementSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Management
        fields = ('id', 'name_kg', 'name_ru', 'job_title_kg', 'job_title_ru',
                  'content_kg', 'content_ru', 'phone', 'email', 'image_url', 'order', 'slug', 'created', 'status')

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None


class VacancySerializer(serializers.ModelSerializer):
    requirements = serializers.SerializerMethodField()
    responsibilities = serializers.SerializerMethodField()

    class Meta:
        model = Vacancy
        fields = ('id', 'title_kg', 'title_ru', 'department_kg', 'department_ru',
                  'schedule_kg', 'schedule_ru', 'salary_kg', 'salary_ru',
                  'requirements', 'responsibilities', 'order', 'slug', 'created', 'status')

    def _split_text(self, text):
        if not text:
            return []
        return [item.strip() for item in text.split(',') if item.strip()]

    def get_requirements(self, obj):
        return self._split_text(obj.requirements)

    def get_responsibilities(self, obj):
        return self._split_text(obj.responsibilities)
