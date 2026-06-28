<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const activeDepartment = ref<string | null>(null)
const imageModal = ref<{ department: string; type: 'before' | 'after' } | null>(null)
const currentImageIndex = ref(0)

interface Department {
  id: string
  nameKey: string
  descriptionKey: string
  beforeCount: number
  afterCount: number
}

const departments: Department[] = [
  { id: 'cardiology', nameKey: 'specialties.cardiology', descriptionKey: 'renovation.departments.cardiology.description', beforeCount: 4, afterCount: 4 },
  { id: 'surgery', nameKey: 'specialties.surgery', descriptionKey: 'renovation.departments.surgery.description', beforeCount: 3, afterCount: 3 },
  { id: 'pediatrics', nameKey: 'specialties.pediatrics', descriptionKey: 'renovation.departments.pediatrics.description', beforeCount: 2, afterCount: 2 },
  { id: 'therapy', nameKey: 'specialties.therapy', descriptionKey: 'renovation.departments.therapy.description', beforeCount: 3, afterCount: 3 },
  { id: 'neurology', nameKey: 'specialties.neurology', descriptionKey: 'renovation.departments.neurology.description', beforeCount: 2, afterCount: 2 },
  { id: 'orthopedics', nameKey: 'specialties.orthopedics', descriptionKey: 'renovation.departments.orthopedics.description', beforeCount: 3, afterCount: 3 },
]

const currentDepartment = computed(() => {
  if (!imageModal.value) return null
  return departments.find((d) => d.id === imageModal.value!.department) || null
})

const maxImages = computed(() => {
  if (!imageModal.value || !currentDepartment.value) return 0
  return imageModal.value.type === 'before' ? currentDepartment.value.beforeCount : currentDepartment.value.afterCount
})

const openModal = (department: string, type: 'before' | 'after') => {
  imageModal.value = { department, type }
  currentImageIndex.value = 0
}

const closeModal = () => {
  imageModal.value = null
  currentImageIndex.value = 0
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % maxImages.value
}

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + maxImages.value) % maxImages.value
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('renovation.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('renovation.subtitle') }}
        </p>
      </div>
    </div>

    <!-- Info Card -->
    <section class="py-8">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto p-6 rounded-2xl bg-muted/30 border-l-4 border-l-primary">
          <h3 class="text-lg font-semibold mb-2">{{ t('renovation.programTitle') }}</h3>
          <p class="text-muted-foreground">{{ t('renovation.programDescription') }}</p>
        </div>
      </div>
    </section>

    <!-- Departments Grid -->
    <section class="py-8">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="dept in departments"
            :key="dept.id"
            class="rounded-2xl border-2 border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2 text-secondary">{{ t(dept.nameKey) }}</h3>
              <p class="text-sm text-muted-foreground mb-4">{{ t(dept.descriptionKey) }}</p>

              <div class="flex gap-2 mb-4">
                <span class="px-2 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground">
                  {{ dept.beforeCount }} {{ t('renovation.photosBefore') }}
                </span>
                <span class="px-2 py-1 text-xs font-medium bg-primary/10 rounded-full text-primary">
                  {{ dept.afterCount }} {{ t('renovation.photosAfter') }}
                </span>
              </div>

              <!-- Preview Images -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    {{ t('renovation.before') }}
                  </div>
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span class="text-white text-xs font-medium">{{ t('renovation.before') }}</span>
                  </div>
                </div>
                <div class="relative aspect-video rounded-lg overflow-hidden bg-primary/10">
                  <div class="w-full h-full flex items-center justify-center text-primary text-sm">
                    {{ t('renovation.after') }}
                  </div>
                  <div class="absolute inset-0 bg-green-600/40 flex items-center justify-center">
                    <span class="text-white text-xs font-medium">{{ t('renovation.after') }}</span>
                  </div>
                </div>
              </div>

              <!-- View Buttons -->
              <div class="flex gap-2">
                <button
                  @click="openModal(dept.id, 'before')"
                  class="flex-1 px-4 py-2 rounded-lg border-2 border-border text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  {{ t('renovation.viewBefore') }}
                </button>
                <button
                  @click="openModal(dept.id, 'after')"
                  class="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  {{ t('renovation.viewAfter') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Modal -->
    <Transition name="modal">
      <div
        v-if="imageModal"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div class="p-4 border-b border-border flex items-center justify-between">
            <h3 class="font-semibold">
              {{ currentDepartment ? t(currentDepartment.nameKey) : '' }} -
              {{ imageModal?.type === 'before' ? t('renovation.before') : t('renovation.after') }}
            </h3>
            <button @click="closeModal" class="p-2 rounded-lg hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-4">
            <div class="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                {{ t('renovation.photo') }} {{ currentImageIndex + 1 }}
              </div>

              <!-- Navigation -->
              <button
                v-if="maxImages > 1"
                @click="prevImage"
                class="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button
                v-if="maxImages > 1"
                @click="nextImage"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>

              <!-- Counter -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                {{ currentImageIndex + 1 }} / {{ maxImages }}
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
