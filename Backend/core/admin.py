from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import get_language

from core import models


def get_localized_title(obj):
    current_language = get_language()
    if current_language in ('ky', 'kg'):
        return obj.title_kg or obj.title_ru or str(obj)
    return obj.title_ru or obj.title_kg or str(obj)


@admin.register(models.AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ('localized_title', 'status', 'created')
    list_editable = ('status',)
    readonly_fields = ('slug', 'created')
    fieldsets = (
        ('На кыргызском', {
            'fields': ('title_kg', 'content_kg',),
        }),
        ('На русском', {
            'fields': ('title_ru', 'content_ru',),
        }),
        ('Настройки', {
            'fields': ('status', 'slug', 'created',)
        }),
    )

    def localized_title(self, obj):
        return get_localized_title(obj)
    localized_title.short_description = 'Заголовок'

    def has_add_permission(self, request):
        if models.AboutUs.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(models.Management)
class ManagementAdmin(admin.ModelAdmin):
    list_per_page = 20
    ordering = ('order', 'id')
    list_display = ('image_preview', 'localized_name', 'localized_job_title', 'phone', 'email', 'order', 'status')
    list_editable = ('order', 'status')
    search_fields = ('name_ru', 'name_kg', 'job_title_ru', 'job_title_kg')
    readonly_fields = ('slug', 'created', 'image_preview')
    fieldsets = (
        ('ФИО', {
            'fields': ('name_kg', 'name_ru',),
        }),
        ('Должность', {
            'fields': ('job_title_kg', 'job_title_ru',),
        }),
        ('Характеристика', {
            'fields': ('content_kg', 'content_ru',),
        }),
        ('Контакты', {
            'fields': ('phone', 'email',),
        }),
        ('Изображение', {
            'fields': ('image', 'image_preview',)
        }),
        ('Настройки', {
            'fields': ('order', 'status', 'slug', 'created',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="80" height="80" style="object-fit: cover; border-radius: 8px;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Фото'

    def localized_name(self, obj):
        current_language = get_language()
        if current_language in ('ky', 'kg'):
            return obj.name_kg or obj.name_ru or '-'
        return obj.name_ru or obj.name_kg or '-'
    localized_name.short_description = 'ФИО'

    def localized_job_title(self, obj):
        current_language = get_language()
        if current_language in ('ky', 'kg'):
            return obj.job_title_kg or obj.job_title_ru or '-'
        return obj.job_title_ru or obj.job_title_kg or '-'
    localized_job_title.short_description = 'Должность'


class NewsImageInline(admin.TabularInline):
    model = models.NewsImage
    extra = 1
    fields = ('image', 'main_image')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" style="object-fit: cover;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Превью'


@admin.register(models.News)
class NewsAdmin(admin.ModelAdmin):
    inlines = [NewsImageInline]
    list_per_page = 20
    ordering = ('-created',)
    search_fields = ('title_ru', 'title_kg')
    list_editable = ('status',)
    list_display = ('localized_title', 'status', 'created')
    readonly_fields = ('slug', 'created')
    fieldsets = (
        ('На кыргызском', {
            'fields': ('title_kg', 'content_kg',),
        }),
        ('На русском', {
            'fields': ('title_ru', 'content_ru',),
        }),
        ('Настройки', {
            'fields': ('status', 'slug', 'created',)
        }),
    )

    def localized_title(self, obj):
        return get_localized_title(obj)
    localized_title.short_description = 'Заголовок'


@admin.register(models.Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_per_page = 20
    ordering = ('order', 'id')
    list_display = ('localized_title', 'localized_department', 'schedule_ru', 'order', 'status')
    list_editable = ('order', 'status')
    search_fields = ('title_ru', 'title_kg', 'department_ru', 'department_kg')
    readonly_fields = ('slug', 'created')
    fieldsets = (
        ('Название', {
            'fields': ('title_kg', 'title_ru',),
        }),
        ('Отдел', {
            'fields': ('department_kg', 'department_ru',),
        }),
        ('График', {
            'fields': ('schedule_kg', 'schedule_ru',),
        }),
        ('Зарплата', {
            'fields': ('salary_kg', 'salary_ru',),
        }),
        ('Требования', {
            'fields': ('requirements',),
            'description': 'Требования через запятую, например: Высшее образование, Стаж 3 года',
        }),
        ('Обязанности', {
            'fields': ('responsibilities',),
            'description': 'Обязанности через запятую, например: Приём пациентов, Ведение документации',
        }),
        ('Настройки', {
            'fields': ('order', 'status', 'slug', 'created',)
        }),
    )

    def localized_title(self, obj):
        return get_localized_title(obj)
    localized_title.short_description = 'Название'

    def localized_department(self, obj):
        current_language = get_language()
        if current_language in ('ky', 'kg'):
            return obj.department_kg or obj.department_ru or '-'
        return obj.department_ru or obj.department_kg or '-'
    localized_department.short_description = 'Отдел'
