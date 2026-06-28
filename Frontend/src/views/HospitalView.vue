<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const departments = [
  {
    id: 'surgery',
    titleKey: 'specialties.surgery',
    description: 'Современные хирургические вмешательства',
    icon: 'scissors',
  },
  {
    id: 'cardiology',
    titleKey: 'specialties.cardiology',
    description: 'Стационарное лечение заболеваний сердца',
    icon: 'heart',
  },
  {
    id: 'therapy',
    titleKey: 'specialties.therapy',
    description: 'Круглосуточное стационарное лечение',
    icon: 'bed',
  },
  {
    id: 'neurology',
    titleKey: 'specialties.neurology',
    description: 'Лечение заболеваний нервной системы',
    icon: 'brain',
  },
  {
    id: 'pediatrics',
    titleKey: 'specialties.pediatrics',
    description: 'Стационарное лечение детей',
    icon: 'baby',
  },
  {
    id: 'orthopedics',
    titleKey: 'specialties.orthopedics',
    description: 'Лечение заболеваний опорно-двигательного аппарата',
    icon: 'bone',
  },
]

const features = [
  { icon: 'bed', count: '209', label: 'Коек' },
  { icon: 'doctor', count: '50+', label: 'Врачей' },
  { icon: 'operation', count: '1000+', label: 'Операций/год' },
  { icon: 'icu', count: '24/7', label: 'Реанимация' },
]
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <RouterLink to="/" class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          {{ t('nav.home') }}
        </RouterLink>
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('structure.hospital.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('structure.hospital.description') }}
        </p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div
            v-for="feature in features"
            :key="feature.label"
            class="text-center p-6 rounded-2xl bg-muted/30"
          >
            <div class="text-4xl font-bold text-primary mb-2">{{ feature.count }}</div>
            <div class="text-muted-foreground">{{ feature.label }}</div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-center mb-12 text-secondary">
          {{ t('hospital.departments') }}
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="dept in departments"
            :key="dept.id"
            class="rounded-2xl border-2 border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div class="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
              <svg v-if="dept.icon === 'scissors'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="6" cy="6" r="3"/>
                <path d="M8.12 8.12 12 12"/>
                <path d="M20 4 8.12 15.88"/>
                <circle cx="6" cy="18" r="3"/>
                <path d="M14.8 14.8 20 20"/>
              </svg>
              <svg v-else-if="dept.icon === 'heart'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              <svg v-else-if="dept.icon === 'bed'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 4v16"/>
                <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
                <path d="M2 17h20"/>
                <path d="M6 8v9"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-secondary">{{ t(dept.titleKey) }}</h3>
            <p class="text-muted-foreground text-sm">{{ dept.description }}</p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <RouterLink to="/appointment" class="btn-primary inline-flex items-center gap-2 no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/>
              <line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
            {{ t('appointment.form.submit') }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
