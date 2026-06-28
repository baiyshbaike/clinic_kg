from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django.utils.translation import get_language

from core import models


def get_localized_title(obj):
    current_language = get_language()
    if current_language == 'ru':
        return obj.title_ru or obj.title_kg or obj.title_en or str(obj)
    elif current_language == 'en':
        return obj.title_en or obj.title_ru or obj.title_kg or str(obj)
    elif current_language == 'ky' or current_language == 'kg':
        return obj.title_kg or obj.title_ru or obj.title_en or str(obj)
    else:
        return obj.title_ru or obj.title_kg or obj.title_en or str(obj)

class MainMenuLinksInline(admin.StackedInline):
    model = models.MainMenuLinks
    extra = 3
    fk_name = "main_menu"
    fieldsets = (
        ('Содержимое', {
            'fields': ('title_kg', 'title_ru', 'title_en', 'link', 'created', 'order', 'on_footer_menu', 'status')
        }),
    )


@admin.register(models.MainMenu)
class MainMenuAdmin(admin.ModelAdmin):
    inlines = [MainMenuLinksInline]
    list_per_page = 10
    search_fields = ('title_ru', 'title_kg', 'title_en')
    ordering = ('order', 'created',)
    list_display = ('localized_title', 'order', 'status', 'delete_button')
    list_editable = ('order', 'status',)
    fields = ('title_kg', 'title_ru', 'title_en', 'created', ('order', 'status'))

    def localized_title(self, obj):
        return get_localized_title(obj)
    localized_title.short_description = 'Заголовок'

    def delete_button(self, obj):
        return format_html('<a class="button" href="{}">Удалить</a>', reverse('admin:core_mainmenu_delete', args=[obj.pk]))
    delete_button.short_description = 'Удалить'


@admin.register(models.MainMenuLinks)
class MainMenuLinksAdmin(admin.ModelAdmin):
    list_per_page = 10
    ordering = ('order', 'created')
    search_fields = ('title_ru', 'title_kg', 'title_en')
    list_editable = ('order', 'status', 'on_footer_menu', 'main_menu')
    fields = ('title_kg', 'title_ru', 'title_en', 'link', 'main_menu', 'on_footer_menu', 'order', 'created','status')
    list_display = ('localized_title','link', 'main_menu','on_footer_menu', 'order', 'status', 'delete_button')

    def localized_title(self, obj):
        return get_localized_title(obj)
    localized_title.short_description = 'Заголовок'

    def delete_button(self, obj):
        return format_html('<a class="button" href="{}">Удалить</a>', reverse('admin:core_mainmenulinks_delete', args=[obj.pk]))
    delete_button.short_description = 'Удалить'


@admin.register(models.PageContent)
class PageContentAdmin(admin.ModelAdmin):
    list_per_page = 10
    ordering = ['created']
    search_fields = ('title_ru', 'title_kg', 'title_en')
    list_editable = ('status',)
    list_display = ('localized_title', 'status', 'delete_button')
    fieldsets = (
        ('На кыргызском', {
            'fields': ('title_kg', 'content_kg',),
        }),
        ('На русском', {
            'fields': ('title_ru', 'content_ru',),
        }),
        ('На английском', {
            'fields': ('title_en', 'content_en',),
        }),
        ('Содержимое страницы', {
            'fields': ('created', 'status',)
        }),
    )

    def localized_title(self, obj):
        return get_localized_title(obj)
    localized_title.short_description = 'Заголовок'

    def delete_button(self, obj):
        return format_html('<a class="button" href="{}">Удалить</a>', reverse('admin:core_pagecontent_delete', args=[obj.pk]))
    delete_button.short_description = 'Удалить'


@admin.register(models.PageUrls)
class PageUrlsAdmin(admin.ModelAdmin):
    list_display = ('name', 'url', 'page_slug', 'status', 'created')
    list_filter = ('status',)
    search_fields = ('name', 'url', 'page_slug')
