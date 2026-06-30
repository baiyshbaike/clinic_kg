<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getNewsList, type NewsItem, type PaginatedResponse } from '@/services/api'

const { t, locale } = useI18n()
const searchQuery = ref('')
const currentPage = ref(1)
const newsData = ref<PaginatedResponse<NewsItem> | null>(null)
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
  return stripped.length > 150 ? stripped.substring(0, 150) + '...' : stripped
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}

const totalPages = computed(() => {
  if (!newsData.value) return 1
  return Math.ceil(newsData.value.count / 9)
})

const pageNumbers = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }
  return pages
})

const fetchNews = async () => {
  loading.value = true
  try {
    newsData.value = await getNewsList(currentPage.value, searchQuery.value)
  } catch (e) {
    console.error('Ошибка загрузки новостей:', e)
  } finally {
    loading.value = false
  }
}

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const onSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchNews()
  }, 500)
}

const goToPage = (page: number | string) => {
  if (typeof page !== 'number') return
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchNews()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('news.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('news.allNews') }}
        </p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              @input="onSearch"
              type="text"
              :placeholder="t('news.searchPlaceholder')"
              class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-4 text-muted-foreground">{{ t('common.loading') }}</p>
        </div>

        <div v-else-if="newsData && newsData.results.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="(item, index) in newsData.results"
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
                  index % 3 === 0 ? 'gradient-primary' :
                  index % 3 === 1 ? 'gradient-secondary' :
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
              <p class="text-muted-foreground text-sm mb-4 line-clamp-3">
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

        <div v-else class="text-center py-12">
          <p class="text-muted-foreground text-lg">{{ t('news.notFound') }}</p>
        </div>

        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          <template v-for="(page, i) in pageNumbers" :key="i">
            <span v-if="page === '...'" class="px-3 py-2 text-muted-foreground">...</span>
            <button
              v-else
              @click="goToPage(page)"
              class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="[
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'border border-border hover:bg-muted'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
