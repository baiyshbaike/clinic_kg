<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import hero1 from '@/assets/images/hero-1.jpg'
import hero2 from '@/assets/images/hero-2.jpg'
import hero3 from '@/assets/images/hero-3.jpg'

const { t } = useI18n()
const swiperRef = ref<SwiperType | null>(null)

const slides = [
  {
    image: hero1,
    titleKey: 'hero.title',
    descriptionKey: 'hero.description',
  },
  {
    image: hero2,
    titleKey: 'advantages.modernEquipment.title',
    descriptionKey: 'advantages.modernEquipment.description',
  },
  {
    image: hero3,
    titleKey: 'advantages.experiencedDoctors.title',
    descriptionKey: 'advantages.experiencedDoctors.description',
  },
]

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper
}
</script>

<template>
  <div class="relative h-[500px] md:h-[600px] overflow-hidden bg-muted">
    <Swiper
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="true"
      :loop="true"
      class="h-full"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="relative h-full">
          <div class="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent z-10" />
          <img
            :src="slide.image"
            :alt="t(slide.titleKey)"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 z-20 flex items-center">
            <div class="container-custom">
              <div class="max-w-2xl text-white">
                <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {{ t(slide.titleKey) }}
                </h1>
                <p class="text-lg md:text-xl opacity-95 animate-fade-in-delay">
                  {{ t(slide.descriptionKey) }}
                </p>
                <div class="mt-8 flex gap-4">
                  <RouterLink to="/contacts" class="btn-primary text-base no-underline">
                    {{ t('hero.cta') }}
                  </RouterLink>
                  <RouterLink to="/about" class="btn-outline border-white text-white hover:bg-white hover:text-secondary text-base no-underline">
                    {{ t('hero.learnMore') }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white !important;
  background: rgba(255, 255, 255, 0.2);
  width: 48px !important;
  height: 48px !important;
  border-radius: 50%;
  backdrop-filter: blur(4px);
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 0.3);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 20px !important;
}

:deep(.swiper-pagination-bullet) {
  background-color: white !important;
  opacity: 0.5 !important;
  width: 10px !important;
  height: 10px !important;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1 !important;
  width: 2rem !important;
}
</style>
