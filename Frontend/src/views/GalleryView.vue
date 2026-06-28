<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { galleryCategories, galleryImages } from '@/data/gallery'
import type { GalleryCategory, GalleryImage } from '@/data/gallery'

const { t } = useI18n()
const selectedCategory = ref<'all' | GalleryCategory>('all')
const selectedImage = ref<GalleryImage | null>(null)

const filteredImages = computed(() => {
  if (selectedCategory.value === 'all') return galleryImages
  return galleryImages.filter((image) => image.category === selectedCategory.value)
})

const getCategoryLabel = (category: 'all' | GalleryCategory) => {
  const item = galleryCategories.find((cat) => cat.id === category)
  return item ? t(item.labelKey) : category
}

const openImage = (image: GalleryImage) => {
  selectedImage.value = image
}

const closeImage = () => {
  selectedImage.value = null
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('gallery.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('gallery.subtitle') }}
        </p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="cat in galleryCategories"
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            v-for="image in filteredImages"
            :key="image.id"
            type="button"
            @click="openImage(image)"
            class="group text-left rounded-xl overflow-hidden bg-white border border-border card-shadow card-hover"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                :src="image.src"
                :alt="image.alt"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 text-white">
                <span class="text-xs font-medium opacity-85">
                  {{ getCategoryLabel(image.category) }}
                </span>
                <h2 class="text-lg font-semibold leading-tight">
                  {{ image.title }}
                </h2>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <Transition name="lightbox">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click="closeImage"
      >
        <button
          class="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          type="button"
          aria-label="Закрыть"
          @click.stop="closeImage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
        <div
          class="max-w-5xl w-full"
          @click.stop
        >
          <img
            :src="selectedImage.src"
            :alt="selectedImage.alt"
            class="w-full max-h-[75vh] object-contain rounded-xl bg-white"
          />
          <div class="mt-4 text-center text-white">
            <p class="text-sm opacity-80">{{ getCategoryLabel(selectedImage.category) }}</p>
            <h2 class="text-2xl font-bold">{{ selectedImage.title }}</h2>
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
