<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const structures = [
  {
    icon: 'building',
    titleKey: 'structure.polyclinic.title',
    descriptionKey: 'structure.polyclinic.description',
    link: '/polyclinic',
  },
  {
    icon: 'bed',
    titleKey: 'structure.hospital.title',
    descriptionKey: 'structure.hospital.description',
    link: '/hospital',
  },
  {
    icon: 'stethoscope',
    titleKey: 'structure.ogpmu.title',
    descriptionKey: 'structure.ogpmu.description',
    link: '/ogpmu',
  },
]
</script>

<template>
  <section class="py-16 bg-muted/30">
    <div class="container-custom">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-secondary">
        {{ t('structure.title') }}
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(structure, index) in structures"
          :key="index"
          class="rounded-2xl border-2 border-border bg-white p-6 text-center hover:shadow-lg hover:border-primary transition-all duration-300 group"
        >
          <div class="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <!-- Building Icon -->
            <svg v-if="structure.icon === 'building'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
              <path d="M9 22v-4h6v4"/>
              <path d="M8 6h.01"/>
              <path d="M16 6h.01"/>
              <path d="M12 6h.01"/>
              <path d="M12 10h.01"/>
              <path d="M12 14h.01"/>
              <path d="M16 10h.01"/>
              <path d="M16 14h.01"/>
              <path d="M8 10h.01"/>
              <path d="M8 14h.01"/>
            </svg>
            <!-- Bed Icon -->
            <svg v-else-if="structure.icon === 'bed'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 4v16"/>
              <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
              <path d="M2 17h20"/>
              <path d="M6 8v9"/>
            </svg>
            <!-- Stethoscope Icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 2v2"/>
              <path d="M5 2v2"/>
              <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/>
              <path d="M8 15a6 6 0 0 0 12 0v-3"/>
              <circle cx="20" cy="10" r="2"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-2 text-secondary">{{ t(structure.titleKey) }}</h3>
          <p class="text-muted-foreground mb-4">{{ t(structure.descriptionKey) }}</p>
          <RouterLink
            :to="structure.link"
            class="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all no-underline"
          >
            {{ t('structure.learnMore') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
