<script setup lang="ts">
import { computed, ref } from 'vue'
import { renovationDepartments, renovationProgram } from '@/data/renovations'

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

const setImage = (index: number) => {
  currentImageIndex.value = index
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <section class="py-16 bg-gradient-to-b from-background to-secondary/5">
      <div class="container-custom">
        <h1 class="text-4xl font-bold text-center mb-4">
          {{ renovationProgram.title }}
        </h1>
        <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {{ renovationProgram.subtitle }}
        </p>

        <div class="max-w-4xl mx-auto mt-16 mb-16">
          <div class="rounded-xl border border-border border-l-4 border-l-primary bg-muted/20 shadow-sm">
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2">О программе модернизации</h3>
              <p class="text-muted-foreground">
                Масштабная программа модернизации клиники была запущена в 2023 году с целью улучшения
                условий оказания медицинской помощи и внедрения современных технологий.
                Ремонтные работы затронули все ключевые отделения больницы.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        <article
          v-for="dept in renovationDepartments"
          :key="dept.id"
          class="rounded-xl border border-border bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <div class="p-6 pb-3">
            <h2 class="text-lg font-semibold leading-none tracking-tight">{{ dept.name }}</h2>
            <p v-if="dept.description" class="text-sm text-muted-foreground mt-2">{{ dept.description }}</p>
            <div class="flex gap-2 mt-2">
              <span class="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                {{ dept.beforeImages.length }} фото до
              </span>
              <span class="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                {{ dept.afterImages.length }} фото после
              </span>
            </div>
          </div>

          <div class="p-6 pt-0">
            <div class="grid grid-cols-2 gap-2 mb-4">
              <div
                v-if="dept.beforeImages[0]"
                class="relative aspect-video rounded-md overflow-hidden"
              >
                <img
                  :src="dept.beforeImages[0].src"
                  :alt="dept.beforeImages[0].title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span class="text-white text-xs font-medium">До ремонта</span>
                </div>
              </div>

              <div
                v-if="dept.afterImages[0]"
                class="relative aspect-video rounded-md overflow-hidden"
              >
                <img
                  :src="dept.afterImages[0].src"
                  :alt="dept.afterImages[0].title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-green-600/40 flex items-center justify-center">
                  <span class="text-white text-xs font-medium">После ремонта</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                type="button"
                @click="openModal(dept.id, 'before')"
                class="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-border bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                До ремонта
              </button>
              <button
                type="button"
                @click="openModal(dept.id, 'after')"
                class="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                После ремонта
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <Transition name="modal">
      <div
        v-if="imageModal && currentDepartment"
        class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div class="p-6 border-b border-border flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ currentDepartment.name }} -
              {{ imageModal.type === 'before' ? 'До ремонта' : 'После ремонта' }}
            </h3>
            <button type="button" @click="closeModal" class="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Закрыть">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>

          <div class="max-h-[70vh] overflow-y-auto p-6">
            <div v-if="currentImages.length === 0" class="text-center py-8 text-muted-foreground">
              Фотографии не найдены
            </div>

            <div v-else class="space-y-4">
              <div class="relative aspect-video rounded-lg overflow-hidden bg-muted">
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
                  {{ currentImageIndex + 1 }} из {{ currentImages.length }}
                </div>
              </div>

              <div v-if="currentImages.length > 1" class="flex gap-2 overflow-x-auto pb-2">
                <button
                  v-for="(image, index) in currentImages"
                  :key="`${image.src}-${index}`"
                  type="button"
                  @click="setImage(index)"
                  class="flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-colors"
                  :class="index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground'"
                >
                  <img
                    :src="image.src"
                    :alt="image.title"
                    class="w-full h-full object-cover"
                  />
                </button>
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
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
