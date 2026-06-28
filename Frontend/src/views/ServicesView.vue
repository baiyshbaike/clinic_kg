<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { services, serviceCategories } from '@/data/services'

const { t } = useI18n()
const selectedCategory = ref('all')

const filteredServices = computed(() => {
  if (selectedCategory.value === 'all') return services
  return services.filter(s => s.category === selectedCategory.value)
})

const getCategoryLabel = (catId: string) => {
  if (catId === 'all') return t('services.categories.all')
  if (catId === 'treatment') return t('services.categories.treatment')
  if (catId === 'diagnostics') return t('services.categories.diagnostics')
  if (catId === 'prevention') return t('services.categories.prevention')
  return catId
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('services.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('services.subtitle') }}
        </p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="flex gap-2 flex-wrap justify-center">
          <button
            v-for="cat in serviceCategories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            class="px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            :class="[
              selectedCategory === cat.id
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            ]"
          >
            {{ getCategoryLabel(cat.id) }}
          </button>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in filteredServices"
            :key="service.id"
            class="group p-6 rounded-2xl bg-white border-l-4 border-l-primary border border-border hover:border-l-accent card-shadow card-hover"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                  <path v-if="service.icon === 'heart'" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path v-else-if="service.icon === 'activity'" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  <path v-else-if="service.icon === 'baby'" d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>
                  <path v-else-if="service.icon === 'eye'" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <path v-else-if="service.icon === 'flask'" d="M9 3h6M10 9V3M14 9V3M6 21h12M10 9h4l2 12H8L10 9z"/>
                  <path v-else-if="service.icon === 'syringe'" d="m18 2 4 4M7.5 13.5 16 5M16 5l-2.5 2.5M16 5l2.5-2.5M2 22l4-4M22 2l-4 4"/>
                  <path v-else-if="service.icon === 'scissors'" d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path v-else-if="service.icon === 'tooth'" d="M12 2C8 2 5 5 5 8c0 2 1 3 2 4l1 4c0 2 1 4 4 4s4-2 4-4l1-4c1-1 2-2 2-4 0-3-3-6-7-6Z"/>
                  <path v-else-if="service.icon === 'bed'" d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>
                  <path v-else-if="service.icon === 'ambulance'" d="M10 18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 14h4M10 14h4M8 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                  <path v-else-if="service.icon === 'scan'" d="M7 2v4M17 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
                  <path v-else-if="service.icon === 'brain'" d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                  <path v-else-if="service.icon === 'bone'" d="M18.2 5.8a2.4 2.4 0 0 1 0 3.4l-4 4a2.4 2.4 0 0 1-3.4 0 2.4 2.4 0 0 1 0-3.4l4-4a2.4 2.4 0 0 1 3.4 0Z"/>
                  <path v-else-if="service.icon === 'stethoscope'" d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1M8 15a6 6 0 0 0 12 0v-3M20 10a2 2 0 1 1-4 0"/>
                  <path v-else-if="service.icon === 'ear'" d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10.5"/>
                  <path v-else d="M12 2v20M2 12h20"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
                    {{ service.title }}
                  </h3>
                  <span class="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {{ getCategoryLabel(service.category) }}
                  </span>
                </div>
                <p class="text-muted-foreground text-sm">
                  {{ service.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold mb-4 text-secondary">{{ t('services.cta.title') }}</h2>
        <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {{ t('services.cta.description') }}
        </p>
        <div class="flex gap-4 justify-center">
          <RouterLink to="/appointment" class="btn-primary no-underline">
            {{ t('services.cta.online') }}
          </RouterLink>
          <a href="tel:+996312626491" class="btn-outline no-underline">
            {{ t('services.cta.phone') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
