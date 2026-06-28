import uuid
from datetime import datetime
import random
import string

from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.utils import timezone
from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from multiselectfield import MultiSelectField
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# def get_upload_name(instance, filename):
#     news_slug = instance.news.slug
#     return f'news_images/{news_slug}/{filename}'
#
#
# def get_upload_name_management(instance, filename):
#     return f"management_images/{instance.pk}/{filename}"


# def get_upload_name_image(instance, filename):
#     imageId = instance.image_galery.slug
#     return f"image_galery/{imageId}/{filename}"

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
    title_kg = models.CharField(verbose_name=_('Title in Kyrgyz'), max_length=255, null=True, blank=True, help_text=_('Enter the title in Kyrgyz language'))
    title_ru = models.CharField(verbose_name=_('Title in Russian'), max_length=255, null=True, blank=True, help_text=_('Enter the title in Russian language'))
    title_en = models.CharField(verbose_name=_('Title in English'), max_length=255, null=True, blank=True, help_text=_('Enter the title in English language'))
    created = models.DateTimeField(verbose_name=_('Created date'), blank=True, null=True, default=timezone.now)
    status = models.BooleanField(default=True, verbose_name=_('Status'), help_text=_('Show status'))
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
    content_kg = RichTextUploadingField(verbose_name=_('Content in Kyrgyz'), null=True, blank=True, help_text=_('Enter the content in Kyrgyz language'))
    content_ru = RichTextUploadingField(verbose_name=_('Content in Russian'), null=True, blank=True, help_text=_('Enter the content in Russian language'))
    content_en = RichTextUploadingField(verbose_name=_('Content in English'), null=True, blank=True, help_text=_('Enter the content in English language'))


class MainMenu (MainModel):
    order = models.PositiveIntegerField(verbose_name=_('Order'), help_text=_('Show the order'), null=True, blank=True, default=1)

    class Meta:
        verbose_name = _('Main menu')
        verbose_name_plural = _('Main menu')
        ordering = ('order', 'id')


class MainMenuLinks(MainModel):
    order = models.PositiveIntegerField(default=1, verbose_name=_('Order'), help_text=_('Show the order'), null=True, blank=True)
    link = models.ForeignKey('PageUrls', related_name='main_link_to', verbose_name=_('Link of page'), null=True, blank=True, on_delete=models.SET_NULL, )
    main_menu = models.ForeignKey('Mainmenu', related_name='links', verbose_name=_('Main menu'), null=True, on_delete=models.SET_NULL, blank=True)
    on_footer_menu = models.BooleanField(default=False, verbose_name=_('Footer menu'), help_text=_('Display from the footer section'), null=True, blank=True)

    class Meta:
        verbose_name = _('Main module')
        verbose_name_plural = _('Main module')
        ordering = ('order', 'id')


class PageUrls(models.Model):
    name = models.CharField(verbose_name=_('link'), blank=True, null=True)
    url = models.CharField(verbose_name=_('model url'), blank=True, null=True)
    page_slug = models.CharField(verbose_name=_('model slug'), blank=True, null=True)
    created = models.DateTimeField(verbose_name=_('Created date'), blank=True, null=True,default=timezone.now)
    status = models.BooleanField(default=True, verbose_name=_('Status'), help_text=_('Show status'))
    slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False)

    def generate_random_string(self, length=10):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

    def save(self, *args, **kwargs):
        if not self.slug:
            random_string = self.generate_random_string(length=16)
            str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
            self.slug = slugify(str_to_slugify)
        super(PageUrls, self).save(*args, **kwargs)

    def __str__(self):
        name = self.name or ""
        if len(name) > 50:
            return name[:50]
        return name or str(self.pk) or "No Name"

    class Meta:
        verbose_name = _('A pointer to a page')
        verbose_name_plural = _('A pointer to a page')


class PageContent(BaseModel):
    page_url = models.OneToOneField(PageUrls,on_delete=models.SET_NULL, blank=True, null=True, editable=False)

    class Meta:
        verbose_name = _('Page')
        verbose_name_plural = _('Pages')
#
#
# Management_CATEGORY = (
#     ("1", _("General manager")),
#     ("2", _("Deputy Director")),
# )
#
#
# class Management(models.Model):
#     job_type = models.CharField(choices=Management_CATEGORY, null=True, blank=True)
#     name_kg = models.CharField(verbose_name='Full Name in Kyrgyz', max_length=255, blank=True, null=True)
#     name_ru = models.CharField(verbose_name='Full Name in Russion', max_length=255, blank=True, null=True)
#     name_en = models.CharField(verbose_name='Full Name in English', max_length=255, blank=True, null=True)
#     job_title_kg = models.CharField(verbose_name='Job title in Kyrgyz', max_length=255, blank=True, null=True)
#     job_title_ru = models.CharField(verbose_name='Job title in Russian', max_length=255, blank=True, null=True)
#     job_title_en = models.CharField(verbose_name='Job title in English', max_length=255, blank=True, null=True)
#     content_kg = RichTextUploadingField(verbose_name=_('Characteristic in Kyrgyz'), null=True, blank=True, help_text=_('Enter the characteristic in Kyrgyz language'))
#     content_ru = RichTextUploadingField(verbose_name=_('Characteristic in Russian'), null=True, blank=True, help_text=_('Enter the characteristic in Russian language'))
#     content_en = RichTextUploadingField(verbose_name=_('Characteristic in English'), null=True, blank=True, help_text=_('Enter the characteristic in English language'))
#     image = models.ImageField(verbose_name=_('Image'), upload_to=get_upload_name_management)
#     image_size_1 = ImageSpecField(source='image', processors=[ResizeToFill(156, 233)], format='JPEG', options={'quality': 90})
#     image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(210, 315)], format='JPEG', options={'quality': 90})
#     image_size_3 = ImageSpecField(source='image', processors=[ResizeToFill(290, 400)], format='JPEG', options={'quality': 90})
#     image_size_4 = ImageSpecField(source='image', processors=[ResizeToFill(350, 500)], format='JPEG', options={'quality': 90})
#     created = models.DateTimeField(verbose_name=_('Created date'), blank=True, null=True, default=timezone.now)
#     status = models.BooleanField(default=True, verbose_name=_('Status'), help_text=_('Show status'))
#     slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False)
#     order = models.PositiveIntegerField(verbose_name=_('Order'), help_text=_('Show the order'), null=True, blank=True, default=1)
#
#     def generate_random_string(self, length=10):
#         return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
#
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             random_string = self.generate_random_string(length=16)
#             str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
#             self.slug = slugify(str_to_slugify)
#         super(Management, self).save(*args, **kwargs)
#
#     def __str__(self):
#         return self.name_ru or self.name_kg or self.name_en or str(self.pk) or "No Name"
#
#     class Meta:
#         verbose_name = _('Administration')
#         verbose_name_plural = _('Administrations')
#         ordering = ('order','id')
#
#
# class PageComponent(BaseModel):
#     page_content = models.ForeignKey(PageContent, on_delete=models.CASCADE,related_name='components', verbose_name=_('Main page'), blank=True, null=True)
#
#     class Meta:
#         verbose_name = _('Additional page')
#         verbose_name_plural = _('Additional pages')
#         ordering = ('id','created')
#
#
# class ManagementComponent(BaseModel):
#     page_management = models.ForeignKey(Management, on_delete=models.CASCADE,related_name='components', verbose_name=_('Main page'), blank=True, null=True)
#
#     class Meta:
#         verbose_name = _('Additional page')
#         verbose_name_plural = _('Additional pages')
#
#
# @receiver(post_save, sender=PageContent)
# def update_or_create_page_urls(sender, instance, created, **kwargs):
#     if created:
#         title=''
#         if instance.title_ru:
#             title = instance.title_ru
#         elif instance.title_kg:
#             title = instance.title_kg
#         elif instance.title_en:
#             title = instance.title_en
#         else:
#             title = "null"
#         PageUrls.objects.create(
#             name=title,
#             page_slug = instance.slug,
#             url='globalcontent',
#             created=instance.created,
#         )
#     else:
#         page_url = PageUrls.objects.filter(page_slug=instance.slug).first()
#         if page_url:
#             title = ''
#             if instance.title_ru:
#                 title = instance.title_ru
#             elif instance.title_kg:
#                 title = instance.title_kg
#             elif instance.title_en:
#                 title = instance.title_en
#             else:
#                 title = "null"
#             page_url.name = title
#             page_url.save()
#
#
# @receiver(post_delete, sender=PageContent)
# def delete_related_page_url(sender, instance, **kwargs):
#     page_url = PageUrls.objects.filter(page_slug=instance.slug).first()
#     if page_url:
#         page_url.delete()
#
#
# NEWS_CATEGORY = (
#     ("allnews", _("Main news")),
#     ("activities", _("Activities of the director")),
#     ("director_appeals", _("Appeal of director")),
#     ("locomotive_announcements", _("Announcements of lokomotiv")),
#     ("anniversary", _("100th anniversary")),
#     ("veterans", _("Veterans")),
#     ("history_of_anniversary", _("100 year history")),
#     ("vacancy", _("Vacancies")),
#     ("auction", _("Auctions")),
#     ("our_station", _("Our station")),
#     ("southern_part",_("Southern part"))
# )
#
#
# class News(BaseModel):
#     category = MultiSelectField(choices=NEWS_CATEGORY, max_length=2048, null=True, blank=True)
#     # category = models.CharField(choices=NEWS_CATEGORY, null=True, blank=True)
#
#     class Meta:
#         verbose_name = _('News')
#         verbose_name_plural = _('News')
#         ordering = ('-created',)
#
#
# class NewsImage(models.Model):
#     image = models.ImageField(verbose_name=_('Image'), upload_to=get_upload_name, help_text=_('Upload the image'))
#     main_image = models.BooleanField(default=False, help_text=_('Main image'))
#     created = models.DateTimeField(auto_now_add=True, verbose_name=_('Created date'), blank=True, null=True)
#     news = models.ForeignKey('News', related_name='images', verbose_name=_('News'), on_delete=models.CASCADE)
#     image_size_1 = ImageSpecField(source='image', processors=[ResizeToFill(163, 130)], format='JPEG',options={'quality': 90})
#     image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(244, 186)], format='JPEG',options={'quality': 90})
#     image_size_3 = ImageSpecField(source='image', processors=[ResizeToFill(700, 615)], format='JPEG',options={'quality': 90})
#     image_size_4 = ImageSpecField(source='image', processors=[ResizeToFill(806, 500)], format='JPEG',options={'quality': 90})
#
#     def __str__(self):
#         return _('News photos') + str(self.news.id)
#
#     class Meta:
#         verbose_name = _('News photos')
#         verbose_name_plural = _('News photos')
#         ordering = ('-created',)
#
# class Slider(MainModel):
#     image = models.ImageField(verbose_name=_('Image'), upload_to='slider_images')
#     image_size_1 = ImageSpecField(source='image', processors=[ResizeToFill(1920, 700)], format='JPEG', options={'quality': 90})
#     order = models.PositiveIntegerField(verbose_name=_('Order'), help_text=_('Show the order'), null=True, blank=True, default=1)
#
#     def __str__(self):
#         return self.title_ru or self.title_kg or self.title_en or str(self.pk) or "No Title"
#
#     class Meta:
#         verbose_name = _('Slider')
#         verbose_name_plural = _('Slider')
#         ordering = ('order', 'id')
#
#
# class BodyLinks(MainModel):
#     link = models.ForeignKey('PageUrls', related_name='body_link_to', verbose_name=_('A pointer to a page'), null=True, blank=True, on_delete=models.SET_NULL, )
#
#     class Meta:
#         verbose_name = _('Module')
#         verbose_name_plural = _('Modules')
#         ordering = ('created', 'id')
#
#
# class ServiceLinks(MainModel):
#     link = models.ForeignKey('PageUrls', related_name='service_link_to', verbose_name=_('A pointer to a page'), null=True, blank=True, on_delete=models.SET_NULL, )
#
#     class Meta:
#         verbose_name = _('Module "Service"')
#         verbose_name_plural = _('Module "Services"')
#         ordering = ('created', 'id')
#
# SOCIAL_CATEGORY =(
#     ("facebook", "facebook"),
#     ("youtube", "youtube"),
#     ("instagram", "instagram"),
#     ("tiktok", "tiktok"),
# )
#
#
# class SocialLinks(models.Model):
#     title = models.CharField(choices=SOCIAL_CATEGORY, unique=True,  verbose_name=_('Name of social link'), null=True, blank=True)
#     url = models.CharField(verbose_name=_('A pointer to a page'), blank=True, null=True, help_text=_('Enter the page url'))
#     created = models.DateTimeField(verbose_name=_('Created date'), blank=True, null=True, default=timezone.now)
#     status = models.BooleanField(default=True, verbose_name=_('Status'), help_text=_('Show status'))
#     slug = models.SlugField(max_length=255, null=True, blank=True, db_index=True, editable=False, unique=True)
#
#     def generate_random_string(self, length=10):
#         return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
#
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             random_string = self.generate_random_string(length=16)
#             str_to_slugify = f'{random_string}_{datetime.now().strftime("%d_%m_%Y_%H_%M_%S")}'
#             self.slug = slugify(str_to_slugify)
#         super(SocialLinks, self).save(*args, **kwargs)
#
#     def __str__(self):
#         return str(self.title) if self.title else (self.slug or str(self.pk) or "No Title")
#
#     class Meta:
#         verbose_name = _('Social app')
#         verbose_name_plural = _('Social apps')
#         ordering = ('created', 'id')
#
#
# IMAGE_CATEGORY =(
#     ("image_galery", _('Photo gallery')),
#     ("anniversary", _("100th anniversary")),
# )
#
#
# class ImageGalery(MainModel):
#     category = MultiSelectField(choices=IMAGE_CATEGORY, max_length=2048, null=True, blank=True)
#
#     class Meta:
#         verbose_name = _('Photo gallery')
#         verbose_name_plural = _('Photo gallery')
#         ordering = ('-created', 'id')
#
#
# class ImagesOfGalery(models.Model):
#     image = models.ImageField(verbose_name=_('Image'), upload_to=get_upload_name_image, help_text=_('Upload the image'))
#     main_image = models.BooleanField(default=False, help_text=_('Main image'))
#     created = models.DateTimeField(auto_now_add=True, verbose_name=_('Created date'), blank=True, null=True)
#     image_galery = models.ForeignKey('ImageGalery', related_name='images', verbose_name=_('Main image'), on_delete=models.CASCADE)
#     image_size_1 = ImageSpecField(source='image', processors=[ResizeToFill(163, 130)], format='JPEG', options={'quality': 90})
#     image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(244, 186)], format='JPEG', options={'quality': 90})
#     image_size_3 = ImageSpecField(source='image', processors=[ResizeToFill(615, 521)], format='JPEG', options={'quality': 90})
#     image_size_4 = ImageSpecField(source='image', processors=[ResizeToFill(806, 500)], format='JPEG', options={'quality': 90})
#
#     def __str__(self):
#         return _('Images of photo gallery') + str(self.image_galery.id)
#
#     class Meta:
#         verbose_name = _('Images of photo gallery')
#         verbose_name_plural = _('Images of photo gallery')
#         ordering = ('-created', 'id')
#
#
# VIDEO_CATEGORY = (
#     ("video_galery", _('Video gallery')),
#     ("activities", _("Director's video report")),
#     ("anniversary", _("100th anniversary")),
# )
#
#
# def validate_youtube_url(value):
#     if not value.startswith('https://www.youtube.com/watch?v='):
#         raise ValidationError(_('Please enter a valid YouTube video URL!'))
#
#
# class VideoGalery(MainModel):
#     category = MultiSelectField(choices=VIDEO_CATEGORY, max_length=2048, null=True, blank=True)
#     image = models.ImageField(verbose_name=_('Image'), upload_to='vidoes/images/', help_text=_('Upload the image'),null=True,blank=True)
#     youtube_url = models.URLField(verbose_name=_('YouTube URL'), help_text=_('Enter the URL of the YouTube video'), validators=[validate_youtube_url], null=True, blank=True)
#     video = models.FileField(verbose_name=_('Video'), upload_to='videos/', help_text=_('Upload the video'), validators=[FileExtensionValidator(allowed_extensions=['mov', 'avi', 'mp4', 'webm', 'mkv'])],null=True,blank=True)
#     image_size_2 = ImageSpecField(source='image', processors=[ResizeToFill(244, 186)], format='JPEG',options={'quality': 90})
#
#     # category = models.CharField(choices=, null=True, blank=True)
#
#     class Meta:
#         verbose_name = _('Video gallery')
#         verbose_name_plural = _('Video gallery')
#         ordering = ('-created', 'id')
#
#     def __str__(self):
#         return f'{self.category} - {self.id}'
#
#
# CONTACT_CATEGORY =(
#     ("address", "Адрес"),
#     ("reception", "Прием"),
#     ("fax", "Факс"),
#     ("email", "Электронная почта"),
#     ("general_department", "Общий отдел"),
#     ("press_service", "Пресс-служба"),
#     ("help","Справочная"),
#     ("ticket_office","Билетная касса")
# )
#
#
# class Contacts(MainModel):
#     order = models.PositiveIntegerField(verbose_name=_('Order'), help_text=_('Show the order'), null=True, blank=True,default=1)
#     class Meta:
#         verbose_name = _('Contact')
#         verbose_name_plural = _('Contacts')
#         ordering = ('order', 'id')
#
#
# class Feedback(models.Model):
#     full_name = models.CharField(verbose_name=_("Full name"), max_length=255)
#     email = models.CharField(verbose_name=_("Email"), max_length=255)
#     subject = models.CharField(verbose_name=_("Subject"), max_length=255)
#     phone_number = models.CharField(verbose_name=_("Phone number"), max_length=255)
#     file = models.FileField(verbose_name="File", upload_to="feedback_files")
#     text = models.TextField(verbose_name=_("Content of the appeal"))
#
#     created = models.DateTimeField(verbose_name=_('Created date'), blank=True, null=True, default=timezone.now)
#     status = models.BooleanField(default=True, verbose_name=_('Status'), help_text=_('Show status'))
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
#         verbose_name = _('Feedback')
#         verbose_name_plural = _('Feedback')
#         ordering = ('created', 'id')
#
