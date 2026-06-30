<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getGalleryAlbums, type GalleryAlbum } from '@/services/api'

const { t } = useI18n()
const albums = ref<GalleryAlbum[]>([])
const loading = ref(true)
const selectedCategory = ref<string>('all')
const selectedAlbum = ref<GalleryAlbum | null>(null)
const currentSlide = ref(0)

const categories = [
  { id: 'all', labelKey: 'common.all' },
  { id: 'polyclinic', labelKey: 'gallery.categories.polyclinic' },
  { id: 'stationary', labelKey: 'gallery.categories.stationary' },
  { id: 'ogpmu', labelKey: 'gallery.categories.ogpmu' },
  { id: 'general', labelKey: 'gallery.categories.general' },
]

const filteredAlbums = computed(() => {
  if (selectedCategory.value === 'all') return albums.value
  return albums.value.filter((album) => album.category === selectedCategory.value)
})

const getCategoryLabel = (category: string) => {
  const cat = categories.find((c) => c.id === category)
  return cat ? t(cat.labelKey) : category
}

const getTitle = (item: GalleryAlbum) => {
  const lang = localStorage.getItem('clinic-language') || 'ru'
  if (lang === 'ky') return item.title_kg || item.title_ru || ''
  return item.title_ru || ''
}

const openAlbum = (album: GalleryAlbum) => {
  selectedAlbum.value = album
  currentSlide.value = 0
}

const closeAlbum = () => {
  selectedAlbum.value = null
  currentSlide.value = 0
}

const nextSlide = () => {
  if (!selectedAlbum.value) return
  currentSlide.value = (currentSlide.value + 1) % selectedAlbum.value.photos.length
}

const prevSlide = () => {
  if (!selectedAlbum.value) return
  currentSlide.value = (currentSlide.value - 1 + selectedAlbum.value.photos.length) % selectedAlbum.value.photos.length
}

const albumImages = computed(() => {
  if (!selectedAlbum.value) return []
  return selectedAlbum.value.photos.map((p) => p.image_url).filter(Boolean) as string[]
})

onMounted(async () => {
  try {
    albums.value = await getGalleryAlbums()
  } catch (e) {
    console.error('Ошибка загрузки галереи:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('gallery.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ t('gallery.subtitle') }}</p>
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

        <div v-else-if="filteredAlbums.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">{{ t('common.notFound') }}</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            v-for="album in filteredAlbums"
            :key="album.id"
            type="button"
            @click="openAlbum(album)"
            class="group text-left rounded-xl overflow-hidden bg-white border border-border card-shadow card-hover"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                :src="album.main_image_url || ''"
                :alt="getTitle(album)"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div v-if="album.photos.length > 1" class="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                {{ album.photos.length }}
              </div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 text-white">
                <span class="text-xs font-medium opacity-85">{{ getCategoryLabel(album.category) }}</span>
                <h2 class="text-lg font-semibold leading-tight">{{ getTitle(album) }}</h2>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <Transition name="lightbox">
      <div
        v-if="selectedAlbum"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click="closeAlbum"
      >
        <button
          class="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition-colors z-10"
          type="button"
          aria-label="Закрыть"
          @click.stop="closeAlbum"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" x2="6" y1="6" y2="18"/>
            <line x1="6" x2="18" y1="6" y2="18"/>
          </svg>
        </button>

        <div class="max-w-5xl w-full" @click.stop>
          <div class="relative rounded-xl overflow-hidden bg-black">
            <img
              :src="albumImages[currentSlide]"
              :alt="getTitle(selectedAlbum)"
              class="w-full max-h-[70vh] object-contain"
            />

            <button
              v-if="albumImages.length > 1"
              @click.stop="prevSlide"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>

            <button
              v-if="albumImages.length > 1"
              @click.stop="nextSlide"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          <div v-if="albumImages.length > 1" class="flex justify-center gap-2 mt-4">
            <button
              v-for="(_, index) in albumImages"
              :key="index"
              @click.stop="currentSlide = index"
              class="w-2.5 h-2.5 rounded-full transition-colors"
              :class="currentSlide === index ? 'bg-white' : 'bg-white/40 hover:bg-white/60'"
              type="button"
            ></button>
          </div>

          <div class="mt-4 text-center text-white">
            <p class="text-sm opacity-80">{{ getCategoryLabel(selectedAlbum.category) }}</p>
            <h2 class="text-2xl font-bold">{{ getTitle(selectedAlbum) }}</h2>
            <p class="text-sm opacity-60 mt-1">{{ currentSlide + 1 }} / {{ albumImages.length }}</p>
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
