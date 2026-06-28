<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { renovationDepartments, renovationProgram } from '@/data/renovations'

const { t } = useI18n()
const imageModal = ref<{ departmentId: string; type: 'before' | 'after' } | null>(null)
const currentImageIndex = ref(0)

const currentDepartment = computed(() => {
  if (!imageModal.value) return null
  return renovationDepartments.find((department) => department.id === imageModal.value?.departmentId) || null
})

const currentImages = computed(() => {
  if (!currentDepartment.value || !imageModal.value) return []
  return imageModal.value.type === 'before'
    ? currentDepartment.value.beforeImages
    : currentDepartment.value.afterImages
})

const openModal = (departmentId: string, type: 'before' | 'after') => {
  imageModal.value = { departmentId, type }
  currentImageIndex.value = 0
}

const closeModal = () => {
  imageModal.value = null
  currentImageIndex.value = 0
}

const nextImage = () => {
  if (!currentImages.value.length) return
  currentImageIndex.value = (currentImageIndex.value + 1) % currentImages.value.length
}

const prevImage = () => {
  if (!currentImages.value.length) return
  currentImageIndex.value = (currentImageIndex.value - 1 + currentImages.value.length) % currentImages.value.length
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ renovationProgram.title }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ renovationProgram.subtitle }}</p>
      </div>
    </div>

    <section class="py-8">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto p-6 rounded-2xl bg-muted/30 border-l-4 border-l-primary">
          <h3 class="text-lg font-semibold mb-2">{{ t('renovation.programTitle') }}</h3>
          <p class="text-muted-foreground">{{ renovationProgram.description }}</p>
        </div>
      </div>
    </section>

    <section class="py-8">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="dept in renovationDepartments"
            :key="dept.id"
            class="rounded-2xl border-2 border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-white"
          >
            <div class="grid grid-cols-2 gap-1">
              <div class="relative aspect-video overflow-hidden bg-muted">
                <img :src="dept.beforeImages[0]?.src" :alt="dept.beforeImages[0]?.title" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/45 flex items-center justify-center">
                  <span class="text-white text-xs font-medium">{{ t('renovation.before') }}</span>
                </div>
              </div>
              <div class="relative aspect-video overflow-hidden bg-muted">
                <img :src="dept.afterImages[0]?.src" :alt="dept.afterImages[0]?.title" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-green-700/35 flex items-center justify-center">
                  <span class="text-white text-xs font-medium">{{ t('renovation.after') }}</span>
                </div>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2 text-secondary">{{ dept.name }}</h3>
              <p class="text-sm text-muted-foreground mb-4">{{ dept.description }}</p>

              <div class="flex gap-2 mb-4">
                <span class="px-2 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground">
                  {{ dept.beforeImages.length }} {{ t('renovation.photosBefore') }}
                </span>
                <span class="px-2 py-1 text-xs font-medium bg-primary/10 rounded-full text-primary">
                  {{ dept.afterImages.length }} {{ t('renovation.photosAfter') }}
                </span>
              </div>

              <div class="flex gap-2">
                <button
                  type="button"
                  @click="openModal(dept.id, 'before')"
                  class="flex-1 px-4 py-2 rounded-lg border-2 border-border text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  {{ t('renovation.viewBefore') }}
                </button>
                <button
                  type="button"
                  @click="openModal(dept.id, 'after')"
                  class="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  {{ t('renovation.viewAfter') }}
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <Transition name="modal">
      <div
        v-if="imageModal && currentDepartment"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div class="p-4 border-b border-border flex items-center justify-between">
            <h3 class="font-semibold">
              {{ currentDepartment.name }} -
              {{ imageModal.type === 'before' ? t('renovation.before') : t('renovation.after') }}
            </h3>
            <button type="button" @click="closeModal" class="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Закрыть">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-4">
            <div class="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              <img
                :src="currentImages[currentImageIndex]?.src"
                :alt="currentImages[currentImageIndex]?.title"
                class="w-full h-full object-cover"
              />

              <button
                v-if="currentImages.length > 1"
                type="button"
                @click="prevImage"
                class="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Предыдущее фото"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button
                v-if="currentImages.length > 1"
                type="button"
                @click="nextImage"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Следующее фото"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>

              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                {{ currentImageIndex + 1 }} / {{ currentImages.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
