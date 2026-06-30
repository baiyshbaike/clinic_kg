<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getVideoGallery, type VideoGalleryItem } from '@/services/api'

const { t } = useI18n()
const videos = ref<VideoGalleryItem[]>([])
const loading = ref(true)
const selectedCategory = ref<string>('all')
const selectedVideo = ref<VideoGalleryItem | null>(null)

const categories = [
  { id: 'all', labelKey: 'common.all' },
  { id: 'polyclinic', labelKey: 'video_gallery.categories.polyclinic' },
  { id: 'stationary', labelKey: 'video_gallery.categories.stationary' },
  { id: 'ogpmu', labelKey: 'video_gallery.categories.ogpmu' },
  { id: 'general', labelKey: 'video_gallery.categories.general' },
]

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'all') return videos.value
  return videos.value.filter((video) => video.category === selectedCategory.value)
})

const getCategoryLabel = (category: string) => {
  const cat = categories.find((c) => c.id === category)
  return cat ? t(cat.labelKey) : category
}

const openVideo = (video: VideoGalleryItem) => {
  selectedVideo.value = video
}

const closeVideo = () => {
  selectedVideo.value = null
}

const getTitle = (item: VideoGalleryItem) => {
  const lang = localStorage.getItem('clinic-language') || 'ru'
  if (lang === 'ky') return item.title_kg || item.title_ru || ''
  return item.title_ru || ''
}

const getDescription = (item: VideoGalleryItem) => {
  const lang = localStorage.getItem('clinic-language') || 'ru'
  if (lang === 'ky') return item.description_kg || item.description_ru || ''
  return item.description_ru || ''
}

onMounted(async () => {
  try {
    videos.value = await getVideoGallery()
  } catch (e) {
    console.error('Ошибка загрузки видеогалереи:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('video_gallery.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ t('video_gallery.subtitle') }}</p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="[
              selectedCategory === cat.id
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            ]"
          >
            {{ t(cat.labelKey) }}
          </button>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-4 text-muted-foreground">{{ t('common.loading') }}</p>
        </div>

        <div v-else-if="filteredVideos.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">{{ t('common.notFound') }}</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            v-for="video in filteredVideos"
            :key="video.id"
            type="button"
            @click="openVideo(video)"
            class="group text-left rounded-xl overflow-hidden bg-white border border-border card-shadow card-hover"
          >
            <div class="relative aspect-video overflow-hidden bg-muted">
              <iframe
                :src="video.youtube_url"
                class="w-full h-full pointer-events-none"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                tabindex="-1"
              ></iframe>
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-4">
              <span class="text-xs font-medium text-primary">{{ getCategoryLabel(video.category) }}</span>
              <h3 class="text-lg font-semibold mt-1 text-secondary leading-tight">{{ getTitle(video) }}</h3>
              <p class="text-sm text-muted-foreground mt-2 line-clamp-2">{{ getDescription(video) }}</p>
            </div>
          </button>
        </div>
      </div>
    </section>

    <Transition name="lightbox">
      <div
        v-if="selectedVideo"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click="closeVideo"
      >
        <button
          class="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition-colors z-10"
          type="button"
          aria-label="Закрыть"
          @click.stop="closeVideo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" x2="6" y1="6" y2="18"/>
            <line x1="6" x2="18" y1="6" y2="18"/>
          </svg>
        </button>
        <div class="max-w-5xl w-full" @click.stop>
          <div class="relative aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              :src="selectedVideo.youtube_url + '?autoplay=1'"
              class="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="mt-4 text-center text-white">
            <p class="text-sm opacity-80">{{ getCategoryLabel(selectedVideo.category) }}</p>
            <h2 class="text-2xl font-bold">{{ getTitle(selectedVideo) }}</h2>
            <p class="text-sm opacity-70 mt-2">{{ getDescription(selectedVideo) }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
