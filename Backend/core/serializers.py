import re
from datetime import timedelta

from django.utils import timezone
from rest_framework import serializers
from .models import AboutUs, News, NewsImage, Management, Vacancy, GalleryAlbum, GalleryPhoto, VideoGallery, ContactMessage


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


class GalleryPhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GalleryPhoto
        fields = ('id', 'image_url', 'is_main', 'created')

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None


class GalleryAlbumSerializer(serializers.ModelSerializer):
    photos = GalleryPhotoSerializer(many=True, read_only=True)
    main_image_url = serializers.SerializerMethodField()
    category_display = serializers.SerializerMethodField()

    class Meta:
        model = GalleryAlbum
        fields = ('id', 'title_kg', 'title_ru', 'category', 'category_display', 'photos', 'main_image_url', 'status', 'created')

    def get_category_display(self, obj):
        return obj.get_category_display()

    def get_main_image_url(self, obj):
        main_photo = obj.photos.filter(is_main=True).first()
        if main_photo and main_photo.image:
            return self.context['request'].build_absolute_uri(main_photo.image.url)
        first_photo = obj.photos.first()
        if first_photo and first_photo.image:
            return self.context['request'].build_absolute_uri(first_photo.image.url)
        return None


class VideoGallerySerializer(serializers.ModelSerializer):
    category_display = serializers.SerializerMethodField()

    class Meta:
        model = VideoGallery
        fields = ('id', 'title_kg', 'title_ru', 'description_kg', 'description_ru',
                  'category', 'category_display', 'youtube_url', 'status', 'created')

    def get_category_display(self, obj):
        return obj.get_category_display()


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ('id', 'name', 'email', 'phone', 'message')

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Обязательное поле.')
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Имя должно содержать минимум 2 символа.')
        return value.strip()

    def validate_email(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Обязательное поле.')
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value.strip()):
            raise serializers.ValidationError('Введите корректный адрес электронной почты.')
        return value.strip().lower()

    def validate_phone(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Обязательное поле.')
        # Убираем пробелы, скобки, дефисы для проверки
        cleaned = re.sub(r'[\s\-\(\)\+]', '', value.strip())
        if not cleaned.isdigit() or len(cleaned) < 7:
            raise serializers.ValidationError('Введите корректный номер телефона.')
        return value.strip()

    def validate_message(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Обязательное поле.')
        if len(value.strip()) < 5:
            raise serializers.ValidationError('Сообщение должно содержать минимум 5 символов.')
        return value.strip()

    def validate(self, data):
        email = data.get('email', '').strip().lower()
        phone = re.sub(r'[\s\-\(\)\+]', '', data.get('phone', '').strip())
        ip_address = self.context.get('ip_address')

        one_month_ago = timezone.now() - timedelta(days=30)

        # Проверка по email
        if ContactMessage.objects.filter(email=email, created__gte=one_month_ago).exists():
            raise serializers.ValidationError({'email': 'Вы уже отправляли сообщение в этом месяце. Попробуйте позже.'})

        # Проверка по телефону
        if ContactMessage.objects.filter(phone__contains=phone, created__gte=one_month_ago).exists():
            raise serializers.ValidationError({'phone': 'Вы уже отправляли сообщение в этом месяце. Попробуйте позже.'})

        # Проверка по IP адресу
        if ip_address and ContactMessage.objects.filter(ip_address=ip_address, created__gte=one_month_ago).exists():
            raise serializers.ValidationError({'message': 'Вы уже отправляли сообщение в этом месяце. Попробуйте позже.'})

        return data
