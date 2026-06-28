<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const quickLinks = [
  {
    icon: 'stethoscope',
    titleKey: 'quickAccess.examination.title',
    descriptionKey: 'quickAccess.examination.description',
    href: '/polyclinic',
    color: 'bg-blue-500',
  },
  {
    icon: 'flask',
    titleKey: 'quickAccess.laboratory.title',
    descriptionKey: 'quickAccess.laboratory.description',
    href: '/polyclinic',
    color: 'bg-green-500',
  },
  {
    icon: 'x-ray',
    titleKey: 'quickAccess.xray.title',
    descriptionKey: 'quickAccess.xray.description',
    href: '/polyclinic',
    color: 'bg-purple-500',
  },
  {
    icon: 'tooth',
    titleKey: 'quickAccess.dental.title',
    descriptionKey: 'quickAccess.dental.description',
    href: '/polyclinic',
    color: 'bg-cyan-500',
  },
  {
    icon: 'eye',
    titleKey: 'quickAccess.ophthalmology.title',
    descriptionKey: 'quickAccess.ophthalmology.description',
    href: '/polyclinic',
    color: 'bg-amber-500',
  },
  {
    icon: 'ambulance',
    titleKey: 'quickAccess.emergency.title',
    descriptionKey: 'quickAccess.emergency.description',
    href: '/contacts',
    color: 'bg-red-500',
  },
]
</script>

<template>
  <section class="py-12 bg-background">
    <div class="container-custom">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <RouterLink
          v-for="link in quickLinks"
          :key="link.titleKey"
          :to="link.href"
          class="group flex flex-col items-center p-6 rounded-2xl bg-white border-2 border-transparent hover:border-primary/20 card-shadow card-hover text-center no-underline"
        >
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            :class="link.color"
          >
            <svg v-if="link.icon === 'stethoscope'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 2v2"/>
              <path d="M5 2v2"/>
              <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/>
              <path d="M8 15a6 6 0 0 0 12 0v-3"/>
              <circle cx="20" cy="10" r="2"/>
            </svg>
            <svg v-else-if="link.icon === 'flask'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 3h6"/>
              <path d="M10 9V3"/>
              <path d="M14 9V3"/>
              <path d="M6 21h12"/>
              <path d="M10 9h4l2 12H8L10 9z"/>
            </svg>
            <svg v-else-if="link.icon === 'x-ray'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 2v4"/>
              <path d="M17 2v4"/>
              <rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/>
              <path d="M9 16 7 14"/>
              <path d="m15 16-2-2"/>
            </svg>
            <svg v-else-if="link.icon === 'tooth'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2C8 2 5 5 5 8c0 2 1 3 2 4l1 4c0 2 1 4 4 4s4-2 4-4l1-4c1-1 2-2 2-4 0-3-3-6-7-6z"/>
              <path d="M9 8h6"/>
              <path d="M9 12h6"/>
            </svg>
            <svg v-else-if="link.icon === 'eye'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else-if="link.icon === 'ambulance'" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
              <path d="M2 14h4"/>
              <path d="M10 14h4"/>
              <circle cx="8" cy="18" r="2"/>
              <circle cx="16" cy="18" r="2"/>
              <path d="M10 6V4"/>
              <path d="M14 6V4"/>
              <path d="M18 6V4"/>
            </svg>
          </div>
          <h3 class="font-semibold text-foreground group-hover:text-primary transition-colors">
            {{ t(link.titleKey) }}
          </h3>
          <p class="text-sm text-muted-foreground mt-1">
            {{ t(link.descriptionKey) }}
          </p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
