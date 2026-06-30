<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getLatestNews, type NewsItem } from '@/services/api'

const { t, locale } = useI18n()
const latestNews = ref<NewsItem[]>([])
const loading = ref(true)

const getTitle = (item: NewsItem) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return item.title_kg || item.title_ru || ''
  return item.title_ru || ''
}

const getExcerpt = (item: NewsItem) => {
  const lang = locale.value
  let content = ''
  if (lang === 'ky' || lang === 'kg') content = item.content_kg || item.content_ru || ''
  else content = item.content_ru || ''

  const stripped = content.replace(/<[^>]+>/g, '')
  return stripped.length > 120 ? stripped.substring(0, 120) + '...' : stripped
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  try {
    latestNews.value = await getLatestNews()
  } catch (e) {
    console.error('Ошибка загрузки новостей:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="py-16 bg-background">
    <div class="container-custom">
      <div class="flex justify-between items-center mb-12">
        <h2 class="section-title text-left mb-0">{{ t('news.title') }}</h2>
        <RouterLink
          to="/news"
          class="btn-outline text-sm no-underline hidden md:inline-flex items-center gap-2"
        >
          {{ t('news.allNews') }}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </RouterLink>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <div v-else class="grid md:grid-cols-3 gap-6">
        <RouterLink
          v-for="(item, index) in latestNews"
          :key="item.id"
          :to="`/news/${item.slug}`"
          class="group rounded-2xl bg-white border-2 border-transparent hover:border-primary overflow-hidden card-shadow card-hover no-underline"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              v-if="item.main_image_url"
              :src="item.main_image_url"
              :alt="getTitle(item)"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-white text-6xl font-bold group-hover:scale-110 transition-transform duration-300"
              :class="[
                index === 0 ? 'gradient-primary' :
                index === 1 ? 'gradient-secondary' :
                'bg-accent'
              ]"
            >
              {{ index + 1 }}
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              <span>{{ formatDate(item.created) }}</span>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
              {{ getTitle(item) }}
            </h3>
            <p class="text-muted-foreground text-sm mb-4 line-clamp-2">
              {{ getExcerpt(item) }}
            </p>
            <div class="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
              <span>{{ t('news.readMore') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="mt-8 text-center md:hidden">
        <RouterLink to="/news" class="btn-outline no-underline">
          {{ t('news.allNews') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
