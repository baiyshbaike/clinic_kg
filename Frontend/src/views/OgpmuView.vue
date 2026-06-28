<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const services = [
  {
    id: 'emergency',
    titleKey: 'about.services.emergency.title',
    descriptionKey: 'about.services.emergency.description',
    icon: 'ambulance',
  },
  {
    id: 'surgery',
    titleKey: 'about.services.surgery.title',
    descriptionKey: 'about.services.surgery.description',
    icon: 'scissors',
  },
  {
    id: 'hospitalization',
    titleKey: 'about.services.hospitalization.title',
    descriptionKey: 'about.services.hospitalization.description',
    icon: 'bed',
  },
  {
    id: 'polyclinic',
    titleKey: 'about.services.polyclinic.title',
    descriptionKey: 'about.services.polyclinic.description',
    icon: 'building',
  },
  {
    id: 'diagnostics',
    titleKey: 'about.services.diagnostics.title',
    descriptionKey: 'about.services.diagnostics.description',
    icon: 'scan',
  },
  {
    id: 'programs',
    titleKey: 'about.services.programs.title',
    descriptionKey: 'about.services.programs.description',
    icon: 'clipboard',
  },
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
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('structure.ogpmu.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('structure.ogpmu.description') }}
        </p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto mb-12">
          <div class="p-6 rounded-2xl bg-muted/30 border-l-4 border-l-primary">
            <h3 class="text-lg font-semibold mb-2">{{ t('ogpmu.about') }}</h3>
            <p class="text-muted-foreground">{{ t('ogpmu.aboutDescription') }}</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-center mb-12 text-secondary">
          {{ t('ogpmu.services') }}
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in services"
            :key="service.id"
            class="rounded-2xl border-2 border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div class="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
              <svg v-if="service.icon === 'ambulance'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
                <path d="M2 14h4"/>
                <path d="M10 14h4"/>
                <circle cx="8" cy="18" r="2"/>
                <circle cx="16" cy="18" r="2"/>
                <path d="M10 6V4"/>
                <path d="M14 6V4"/>
                <path d="M18 6V4"/>
              </svg>
              <svg v-else-if="service.icon === 'scissors'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="6" cy="6" r="3"/>
                <path d="M8.12 8.12 12 12"/>
                <path d="M20 4 8.12 15.88"/>
                <circle cx="6" cy="18" r="3"/>
                <path d="M14.8 14.8 20 20"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-secondary">{{ t(service.titleKey) }}</h3>
            <p class="text-muted-foreground text-sm">{{ t(service.descriptionKey) }}</p>
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
