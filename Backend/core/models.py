import io
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
from PIL import Image


MAX_IMAGE_SIZE_MB = 10
TARGET_IMAGE_SIZE_MB = 1.5
IMAGE_QUALITY_START = 95
IMAGE_QUALITY_MIN = 30


def compress_image(image_file):
    """Сжимает изображение до целевого размера (например, 10MB -> 1.5MB) без потери качества."""
    if not image_file:
        return image_file

    original_size = image_file.size
    target_bytes = TARGET_IMAGE_SIZE_MB * 1024 * 1024

    if original_size <= target_bytes:
        return image_file

    img = Image.open(image_file)
    if img.mode in ('RGBA', 'P'):
        img = img.convert('RGB')

    img_format = 'JPEG'
    content_type = image_file.content_type

    if hasattr(image_file, 'name') and image_file.name:
        ext = image_file.name.rsplit('.', 1)[-1].lower()
        if ext == 'png':
            img_format = 'PNG'
        elif ext == 'webp':
            img_format = 'WEBP'

    quality = IMAGE_QUALITY_START
    output = io.BytesIO()

    while quality >= IMAGE_QUALITY_MIN:
        output.seek(0)
        output.truncate()
        img.save(output, format=img_format, quality=quality, optimize=True)
        if output.tell() <= target_bytes:
            break
        quality -= 5

    output.seek(0)

    original_name = image_file.name
    new_name = original_name.rsplit('.', 1)[0] + '.' + img_format.lower()

    compressed = image_file.__class__(output, name=new_name)
    compressed.content_type = f'image/{img_format.lower()}'

    return compressed


# Функция для получения пути загрузки изображения новости
def get_upload_name(instance, filename):
    news_slug = instance.news.slug
    return f'news_images/{news_slug}/{filename}'


# Функция для получения пути загрузки изображения руководства
def get_upload_name_management(instance, filename):
    return f"management_images/{instance.pk}/{filename}"


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
        return self.title_ru or self.title_kg or str(self.pk) or "No Title"

    class Meta:
        abstract = True


class BaseModel(MainModel):
    content_kg = CKEditor5Field(verbose_name='Контент на кыргызском', config_name='extends', null=True, blank=True, help_text='Введите контент на кыргызском языке')
    content_ru = CKEditor5Field(verbose_name='Контент на русском', config_name='extends', null=True, blank=True, help_text='Введите контент на русском языке')


class Management(models.Model):
    name_kg = models.CharField(verbose_name='ФИО на кыргызском', max_length=255, blank=True, null=True)
    name_ru = models.CharField(verbose_name='ФИО на русском', max_length=255, blank=True, null=True)
    job_title_kg = models.CharField(verbose_name='Должность на кыргызском', max_length=255, blank=True, null=True)
    job_title_ru = models.CharField(verbose_name='Должность на русском', max_length=255, blank=True, null=True)
    content_kg = CKEditor5Field(verbose_name='Характеристика на кыргызском', config_name='extends', null=True, blank=True, help_text='Введите характеристику на кыргызском языке')
    content_ru = CKEditor5Field(verbose_name='Характеристика на русском', config_name='extends', null=True, blank=True, help_text='Введите характеристику на русском языке')
    phone = models.CharField(verbose_name='Телефон', max_length=50, blank=True, null=True)
    email = models.EmailField(verbose_name='Электронная почта', blank=True, null=True)
    image = models.ImageField(verbose_name='Изображение', upload_to=get_upload_name_management, blank=True, null=True)
    created = models.DateTimeField(verbose_name='Дата создания', blank=True, null=True, default=timezone.now)
    status = models.BooleanField(default=True, verbose_name='Статус', help_text='Показать статус')
    slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False, unique=True)
    order = models.PositiveIntegerField(verbose_name='Порядок', help_text='Показать порядок', null=True, blank=True, default=1)

    def save(self, *args, **kwargs):
        if self.image and hasattr(self.image, 'size'):
            self.image = compress_image(self.image)
        if not self.slug:
            random_string = generate_random_string(length=16)
            str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
            self.slug = slugify(str_to_slugify)
        super(Management, self).save(*args, **kwargs)

    def __str__(self):
        return self.name_ru or self.name_kg or str(self.pk) or "No Name"

    class Meta:
        verbose_name = 'Руководство'
        verbose_name_plural = 'Руководства'
        ordering = ('order', 'id')


class AboutUs(BaseModel, SingletonModel):
    def save(self, *args, **kwargs):
        self.pk = 1
        if not self.slug:
            random_string = generate_random_string(length=16)
            str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
            self.slug = slugify(str_to_slugify)
        super(AboutUs, self).save(*args, **kwargs)

    def __str__(self):
        return "О клинике"

    class Meta:
        verbose_name = 'О клинике'
        verbose_name_plural = 'О клинике'
        ordering = ('id', 'created')


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

    def save(self, *args, **kwargs):
        if self.image and hasattr(self.image, 'size'):
            self.image = compress_image(self.image)
        super(NewsImage, self).save(*args, **kwargs)

    def __str__(self):
        return 'Фотографии новостей ' + str(self.news.id)

    class Meta:
        verbose_name = 'Фотографии новостей'
        verbose_name_plural = 'Фотографии новостей'
        ordering = ('-created',)


class Vacancy(models.Model):
    title_kg = models.CharField(verbose_name='Название на кыргызском', max_length=500, blank=True, null=True)
    title_ru = models.CharField(verbose_name='Название на русском', max_length=500, blank=True, null=True)
    department_kg = models.CharField(verbose_name='Отдел на кыргызском', max_length=255, blank=True, null=True)
    department_ru = models.CharField(verbose_name='Отдел на русском', max_length=255, blank=True, null=True)
    schedule_kg = models.CharField(verbose_name='График на кыргызском', max_length=255, blank=True, null=True)
    schedule_ru = models.CharField(verbose_name='График на русском', max_length=255, blank=True, null=True)
    salary_kg = models.CharField(verbose_name='Зарплата на кыргызском', max_length=255, blank=True, null=True)
    salary_ru = models.CharField(verbose_name='Зарплата на русском', max_length=255, blank=True, null=True)
    requirements = models.TextField(verbose_name='Требования', blank=True, null=True, help_text='Требования через запятую')
    responsibilities = models.TextField(verbose_name='Обязанности', blank=True, null=True, help_text='Обязанности через запятую')
    created = models.DateTimeField(verbose_name='Дата создания', blank=True, null=True, default=timezone.now)
    status = models.BooleanField(default=True, verbose_name='Статус', help_text='Показать статус')
    slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False, unique=True)
    order = models.PositiveIntegerField(verbose_name='Порядок', null=True, blank=True, default=1)

    def save(self, *args, **kwargs):
        if not self.slug:
            random_string = generate_random_string(length=16)
            str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
            self.slug = slugify(str_to_slugify)
        super(Vacancy, self).save(*args, **kwargs)

    def __str__(self):
        return self.title_ru or self.title_kg or str(self.pk) or "No Title"

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'
        ordering = ('order', 'id')
