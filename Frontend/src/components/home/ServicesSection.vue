<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const services = [
  { icon: 'heart', titleKey: 'services.items.cardiology.title', descKey: 'services.items.cardiology.description' },
  { icon: 'activity', titleKey: 'services.items.therapy.title', descKey: 'services.items.therapy.description' },
  { icon: 'baby', titleKey: 'services.items.pediatrics.title', descKey: 'services.items.pediatrics.description' },
  { icon: 'eye', titleKey: 'services.items.ophthalmology.title', descKey: 'services.items.ophthalmology.description' },
  { icon: 'flask', titleKey: 'services.items.laboratory.title', descKey: 'services.items.laboratory.description' },
  { icon: 'syringe', titleKey: 'services.items.vaccination.title', descKey: 'services.items.vaccination.description' },
]
</script>

<template>
  <section class="py-16">
    <div class="container-custom">
      <h2 class="section-title">{{ t('services.title') }}</h2>
      <p class="section-subtitle">
        {{ t('services.subtitle') }}
      </p>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="service in services"
          :key="service.titleKey"
          class="group p-6 rounded-2xl bg-white border-l-4 border-l-primary border border-border hover:border-l-accent card-shadow card-hover cursor-pointer"
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
                <path v-else d="M12 2v20M2 12h20"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-2 text-secondary group-hover:text-primary transition-colors">
                {{ t(service.titleKey) }}
              </h3>
              <p class="text-muted-foreground text-sm">
                {{ t(service.descKey) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
