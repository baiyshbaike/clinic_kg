<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getNewsDetail, getNewsList, type NewsItem } from '@/services/api'

const { t, locale } = useI18n()
const route = useRoute()

const article = ref<NewsItem | null>(null)
const relatedNews = ref<NewsItem[]>([])
const loading = ref(true)
const currentSlide = ref(0)

const getTitle = (item: NewsItem) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return item.title_kg || item.title_ru || ''
  return item.title_ru || ''
}

const getContent = (item: NewsItem) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return item.content_kg || item.content_ru || ''
  return item.content_ru || ''
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}

const allImages = computed(() => {
  if (!article.value || !article.value.images) return []
  return article.value.images.map(img => img.image)
})

const prevSlide = () => {
  if (currentSlide.value > 0) currentSlide.value--
}

const nextSlide = () => {
  if (currentSlide.value < allImages.value.length - 1) currentSlide.value++
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const shareLinks = computed(() => {
  if (!article.value) return []
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(getTitle(article.value))

  return [
    { label: 'Facebook', className: 'bg-blue-500 hover:bg-blue-600', href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: 'facebook' },
    { label: 'X', className: 'bg-sky-500 hover:bg-sky-600', href: `https://twitter.com/intent/tweet?url=${url}&text=${title}`, icon: 'twitter' },
    { label: 'WhatsApp', className: 'bg-green-500 hover:bg-green-600', href: `https://wa.me/?text=${title}%20${url}`, icon: 'whatsapp' },
  ]
})

onMounted(async () => {
  loading.value = true
  try {
    const slug = route.params.id as string
    article.value = await getNewsDetail(slug)

    const newsResp = await getNewsList(1)
    relatedNews.value = newsResp.results
      .filter((n: NewsItem) => n.slug !== slug)
      .slice(0, 3)
  } catch (e) {
    console.error('Ошибка загрузки новости:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <RouterLink to="/news" class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          {{ t('news.backToNews') }}
        </RouterLink>
        <h1 v-if="article" class="text-3xl md:text-4xl font-bold mb-4">{{ getTitle(article) }}</h1>
      </div>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <section v-else-if="article" class="py-16">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              <span>{{ formatDate(article.created) }}</span>
            </div>
          </div>

          <div v-if="allImages.length > 0" class="mb-8 rounded-xl overflow-hidden card-shadow">
            <div class="relative">
              <div class="overflow-hidden">
                <img
                  :src="allImages[currentSlide]"
                  :alt="getTitle(article)"
                  class="w-full max-h-[500px] object-cover transition-transform duration-300"
                />
              </div>

              <template v-if="allImages.length > 1">
                <button
                  @click="prevSlide"
                  :disabled="currentSlide === 0"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  @click="nextSlide"
                  :disabled="currentSlide === allImages.length - 1"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </template>

              <div v-if="allImages.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  v-for="(_, index) in allImages"
                  :key="index"
                  @click="goToSlide(index)"
                  class="w-2.5 h-2.5 rounded-full transition-colors"
                  :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
                />
              </div>
            </div>
          </div>

          <div class="prose prose-lg max-w-none" v-html="getContent(article)"></div>

          <div class="mt-12 pt-8 border-t border-border">
            <h3 class="text-lg font-semibold mb-4">{{ t('news.share') }}</h3>
            <div class="flex gap-3">
              <a
                v-for="link in shareLinks"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="link.label"
                class="w-10 h-10 rounded-lg text-white flex items-center justify-center transition-colors no-underline"
                :class="link.className"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path v-if="link.icon === 'facebook'" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  <path v-else-if="link.icon === 'twitter'" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  <path v-else d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="!loading && relatedNews.length > 0" class="py-16 bg-muted/30">
      <div class="container-custom">
        <h2 class="text-2xl font-bold mb-8 text-secondary">{{ t('news.relatedNews') }}</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <RouterLink
            v-for="(item, index) in relatedNews"
            :key="item.id"
            :to="`/news/${item.slug}`"
            class="group rounded-2xl bg-white border-2 border-transparent hover:border-primary overflow-hidden card-shadow card-hover no-underline"
          >
            <div class="relative h-32 overflow-hidden">
              <img
                v-if="item.main_image_url"
                :src="item.main_image_url"
                :alt="getTitle(item)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-white text-4xl font-bold group-hover:scale-110 transition-transform duration-300"
                :class="[index % 3 === 0 ? 'gradient-primary' : index % 3 === 1 ? 'gradient-secondary' : 'bg-accent']"
              >
                {{ index + 1 }}
              </div>
            </div>
            <div class="p-4">
              <p class="text-sm text-muted-foreground mb-1">{{ formatDate(item.created) }}</p>
              <h3 class="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {{ getTitle(item) }}
              </h3>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section v-if="!loading && !article" class="py-16">
      <div class="container-custom text-center">
        <h2 class="text-2xl font-bold mb-4">{{ t('common.notFound') }}</h2>
        <p class="text-muted-foreground mb-8">{{ t('common.pageNotFound') }}</p>
        <RouterLink to="/news" class="btn-primary no-underline">
          {{ t('news.backToNews') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>
