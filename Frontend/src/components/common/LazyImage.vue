<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  class?: string
}>()

const imageRef = ref<HTMLImageElement | null>(null)
const isLoaded = ref(false)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!imageRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px',
      threshold: 0.1,
    }
  )

  observer.observe(imageRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})

const onLoad = () => {
  isLoaded.value = true
}
</script>

<template>
  <div ref="imageRef" class="relative overflow-hidden" :class="props.class">
    <!-- Skeleton -->
    <div
      v-if="!isLoaded"
      class="absolute inset-0 bg-muted animate-pulse"
    />

    <!-- Actual Image -->
    <img
      v-if="isVisible"
      :src="props.src"
      :alt="props.alt"
      class="w-full h-full object-cover transition-opacity duration-500"
      :class="[isLoaded ? 'opacity-100' : 'opacity-0']"
      @load="onLoad"
    />
  </div>
</template>
