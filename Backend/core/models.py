import uuid
from datetime import datetime
import random
import string

from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.utils import timezone
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from multiselectfield import MultiSelectField
from django.utils.text import slugify
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Функция для получения пути загрузки изображения новости
def get_upload_name(instance, filename):
    news_slug = instance.news.slug
    return f'news_images/{news_slug}/{filename}'


# Функция для получения пути загрузки изображения руководства
def get_upload_name_management(instance, filename):
    return f"management_images/{instance.pk}/{filename}"


# Функция для получения пути загрузки изображения галереи
def get_upload_name_image(instance, filename):
    imageId = instance.image_gellery.slug
    return f"image_gellery/{imageId}/{filename}"

def generate_random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

class MainModel(models.Model):
    title_kg = models.CharField(verbose_name='Название на кыргызском', max_length=255, null=True, blank=True, help_text='Введите название на кыргызском языке')
    title_ru = models.CharField(verbose_name='Название на русском', max_length=255, null=True, blank=True, help_text='Введите название на русском языке')
    title_en = models.CharField(verbose_name='Название на английском', max_length=255, null=True, blank=True, help_text='Введите название на английском языке')
    created = models.DateTimeField(verbose_name='Дата создания', blank=True, null=True, default=timezone.now)
    status = models.BooleanField(default=True, verbose_name='Статус', help_text='Показать статус')
    slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            random_string = generate_random_string(length=16)
            str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
            self.slug = slugify(str_to_slugify)
        super(MainModel, self).save(*args, **kwargs)

    def __str__(self):
        return self.title_ru or self.title_kg or self.title_en or str(self.pk) or "No Title"


class BaseModel(MainModel):
    content_kg = CKEditor5Field(verbose_name='Контент на кыргызском', config_name='extends', null=True, blank=True, help_text='Введите контент на кыргызском языке')
    content_ru = CKEditor5Field(verbose_name='Контент на русском', config_name='extends', null=True, blank=True, help_text='Введите контент на русском языке')
    content_en = CKEditor5Field(verbose_name='Контент на английском', config_name='extends', null=True, blank=True, help_text='Введите контент на английском языке')


# class Management(models.Model):
#     name_kg = models.CharField(verbose_name='ФИО на кыргызском', max_length=255, blank=True, null=True)
#     name_ru = models.CharField(verbose_name='ФИО на русском', max_length=255, blank=True, null=True)
#     name_en = models.CharField(verbose_name='ФИО на английском', max_length=255, blank=True, null=True)
#     job_title_kg = models.CharField(verbose_name='Должность на кыргызском', max_length=255, blank=True, null=True)
#     job_title_ru = models.CharField(verbose_name='Должность на русском', max_length=255, blank=True, null=True)
#     job_title_en = models.CharField(verbose_name='Должность на английском', max_length=255, blank=True, null=True)
#     content_kg = CKEditor5Field(verbose_name='Характеристика на кыргызском', config_name='extends', null=True, blank=True, help_text='Введите характеристику на кыргызском языке')
#     content_ru = CKEditor5Field(verbose_name='Характеристика на русском', config_name='extends', null=True, blank=True, help_text='Введите характеристику на русском языке')
#     content_en = CKEditor5Field(verbose_name='Характеристика на английском', config_name='extends', null=True, blank=True, help_text='Введите характеристику на английском языке')
#     image = models.ImageField(verbose_name='Изображение', upload_to=get_upload_name_management)
#     image_size_1 = ImageSpecField(source='image', processors=[ResizeToFill(156, 233)], format='JPEG', options={'quality': 90})
#     image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(210, 315)], format='JPEG', options={'quality': 90})
#     image_size_3 = ImageSpecField(source='image', processors=[ResizeToFill(290, 400)], format='JPEG', options={'quality': 90})
#     image_size_4 = ImageSpecField(source='image', processors=[ResizeToFill(350, 500)], format='JPEG', options={'quality': 90})
#     created = models.DateTimeField(verbose_name='Дата создания', blank=True, null=True, default=timezone.now)
#     status = models.BooleanField(default=True, verbose_name='Статус', help_text='Показать статус')
#     slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False)
#     order = models.PositiveIntegerField(verbose_name='Порядок', help_text='Показать порядок', null=True, blank=True, default=1)
#
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             random_string = generate_random_string(length=16)
#             str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
#             self.slug = slugify(str_to_slugify)
#         super(Management, self).save(*args, **kwargs)
#
#     def __str__(self):
#         return self.name_ru or self.name_kg or self.name_en or str(self.pk) or "No Name"
#
#     class Meta:
#         verbose_name = 'Руководство'
#         verbose_name_plural = 'Руководства'
#         ordering = ('order','id')

class AboutUs(BaseModel,SingletonModel):
    content_kg = CKEditor5Field(verbose_name='Контент на кыргызском', config_name='extends', null=True, blank=True,
                                help_text='Введите контент на кыргызском языке')
    content_ru = CKEditor5Field(verbose_name='Контент на русском', config_name='extends', null=True, blank=True,
                                help_text='Введите контент на русском языке')
    content_en = CKEditor5Field(verbose_name='Контент на английском', config_name='extends', null=True, blank=True,
                                help_text='Введите контент на английском языке')
    created = models.DateTimeField(verbose_name='Дата создания', blank=True, null=True, default=timezone.now)
    status = models.BooleanField(default=True, verbose_name='Статус', help_text='Показать статус')
    slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            random_string = generate_random_string(length=16)
            str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
            self.slug = slugify(str_to_slugify)
        super(MainModel, self).save(*args, **kwargs)

    def __str__(self):
        return "О клинике"
    class Meta:
        verbose_name = 'О клинике'
        verbose_name_plural = 'О клинике'
        ordering = ('id','created')


class News(BaseModel):
    class Meta:
        verbose_name = 'Новости'
        verbose_name_plural = 'Новости'
        ordering = ('-created',)


class NewsImage(models.Model):
    image = models.ImageField(verbose_name='Изображение', upload_to=get_upload_name, help_text='Загрузить изображение')
    main_image = models.BooleanField(default=False, help_text='Основное изображение')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания', blank=True, null=True)
    news = models.ForeignKey('News', related_name='images', verbose_name='Новости', on_delete=models.CASCADE)
    image_size_1 = ImageSpecField(source='image', processors=[ResizeToFill(163, 130)], format='JPEG', options={'quality': 90})
    image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(244, 186)], format='JPEG', options={'quality': 90})
    image_size_3 = ImageSpecField(source='image', processors=[ResizeToFill(700, 615)], format='JPEG', options={'quality': 90})
    image_size_4 = ImageSpecField(source='image', processors=[ResizeToFill(806, 500)], format='JPEG', options={'quality': 90})

    def __str__(self):
        return 'Фотографии новостей' + str(self.news.id)

    class Meta:
        verbose_name = 'Фотографии новостей'
        verbose_name_plural = 'Фотографии новостей'
        ordering = ('-created',)



# # Категории социальных сетей
# SOCIAL_CATEGORY =(
#     ("facebook", "facebook"),
#     ("youtube", "youtube"),
#     ("instagram", "instagram"),
#     ("tiktok", "tiktok"),
# )
#
#
# #Социальные ссылки
# class SocialLinks(models.Model):
#     title = models.CharField(choices=SOCIAL_CATEGORY, unique=True, verbose_name='Название социальной ссылки', null=True, blank=True)
#     url = models.CharField(verbose_name='Указатель на страницу', blank=True, null=True, help_text='Введите url страницы')
#     created = models.DateTimeField(verbose_name='Дата создания', blank=True, null=True, default=timezone.now)
#     status = models.BooleanField(default=True, verbose_name='Статус', help_text='Показать статус')
#     slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False, unique=True)
#
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             random_string = generate_random_string(length=16)
#             str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
#             self.slug = slugify(str_to_slugify)
#         super(SocialLinks, self).save(*args, **kwargs)
#
#     def __str__(self):
#         return str(self.title) if self.title else (self.slug or str(self.pk) or "No Title")
#
#     class Meta:
#         verbose_name = 'Социальное приложение'
#         verbose_name_plural = 'Социальные приложения'
#         ordering = ('created', 'id')
#
# # Категории фотографий
# IMAGE_CATEGORY =(
#     ("image_gellery", 'Фотогалерея'),
#     ("anniversary", "100-летие"),
# )
#
# class ImagesOfgellery(models.Model):
#     image = models.ImageField(verbose_name='Изображение', upload_to=get_upload_name_image, help_text='Загрузить изображение')
#     main_image = models.BooleanField(default=False, help_text='Основное изображение')
#     created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания', blank=True, null=True)
#     image_size_1 = ImageSpecField(source='image', processors=[ResizeToFill(163, 130)], format='JPEG', options={'quality': 90})
#     image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(244, 186)], format='JPEG', options={'quality': 90})
#     image_size_3 = ImageSpecField(source='image', processors=[ResizeToFill(615, 521)], format='JPEG', options={'quality': 90})
#     image_size_4 = ImageSpecField(source='image', processors=[ResizeToFill(806, 500)], format='JPEG', options={'quality': 90})
#
#     def __str__(self):
#         return 'Изображения фотогалереи ' + str(self.image_gellery.id)
#
#     class Meta:
#         verbose_name = 'Изображения фотогалереи'
#         verbose_name_plural = 'Изображения фотогалереи'
#         ordering = ('-created', 'id')
#
#
# #Проверка ссылки YouTube
# def validate_youtube_url(value):
#     if not value.startswith('https://www.youtube.com/watch?v='):
#         raise ValidationError('Пожалуйста, введите корректный URL видео YouTube!')
#
#
# #Видеогалерея
# class Videogellery(MainModel):
#     image = models.ImageField(verbose_name='Изображение', upload_to='vidoes/images/', help_text='Загрузить изображение', null=True, blank=True)
#     youtube_url = models.URLField(verbose_name='YouTube URL', help_text='Введите URL видео на YouTube', validators=[validate_youtube_url], null=True, blank=True)
#     video = models.FileField(verbose_name='Видео', upload_to='videos/', help_text='Загрузить видео', validators=[FileExtensionValidator(allowed_extensions=['mov', 'avi', 'mp4', 'webm', 'mkv'])], null=True, blank=True)
#     image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(244, 186)], format='JPEG', options={'quality': 90})
#
#     class Meta:
#         verbose_name = 'Видеогалерея'
#         verbose_name_plural = 'Видеогалерея'
#         ordering = ('-created', 'id')
#
#     def __str__(self):
#         return f'{self.category} - {self.id}'
#
#
# #Обратная связь
# class Feedback(models.Model):
#     full_name = models.CharField(verbose_name="ФИО", max_length=255)
#     email = models.CharField(verbose_name="Электронная почта", max_length=255)
#     subject = models.CharField(verbose_name="Тема", max_length=255)
#     phone_number = models.CharField(verbose_name="Номер телефона", max_length=255)
#     file = models.FileField(verbose_name="Файл", upload_to="feedback_files")
#     text = models.TextField(verbose_name="Содержание обращения")
#
#     created = models.DateTimeField(verbose_name='Дата создания', blank=True, null=True, default=timezone.now)
#     status = models.BooleanField(default=True, verbose_name='Статус', help_text='Показать статус')
#     slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False, unique=True)
#
#     def generate_slug(self):
#         return str(uuid.uuid4())
#
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = self.generate_slug()
#         super(Feedback, self).save(*args, **kwargs)
#
#     def __str__(self):
#         return self.email or self.full_name or str(self.pk) or "No Email/Name"
#
#     class Meta:
#         verbose_name = 'Обратная связь'
#         verbose_name_plural = 'Обратная связь'
#         ordering = ('created', 'id')
