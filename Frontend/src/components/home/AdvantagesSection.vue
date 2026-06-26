<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const advantages = [
  {
    icon: 'users',
    titleKey: 'advantages.experiencedDoctors.title',
    descriptionKey: 'advantages.experiencedDoctors.description',
  },
  {
    icon: 'microscope',
    titleKey: 'advantages.modernEquipment.title',
    descriptionKey: 'advantages.modernEquipment.description',
  },
  {
    icon: 'dollar',
    titleKey: 'advantages.affordablePrices.title',
    descriptionKey: 'advantages.affordablePrices.description',
  },
  {
    icon: 'building',
    titleKey: 'advantages.comprehensiveCare.title',
    descriptionKey: 'advantages.comprehensiveCare.description',
  },
]
</script>

<template>
  <section class="py-16 bg-muted/30">
    <div class="container-custom">
      <div class="max-w-7xl mx-auto">
        <h2 class="section-title">{{ t('advantages.title') }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(advantage, index) in advantages"
            :key="index"
            class="text-center p-6 rounded-2xl bg-white border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-lg group"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg v-if="advantage.icon === 'users'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <svg v-else-if="advantage.icon === 'microscope'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M6 18h8"/>
                <path d="M3 22h18"/>
                <path d="M14 22a7 7 0 1 0 0-14h-1"/>
                <path d="M9 14h2"/>
                <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
                <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
              </svg>
              <svg v-else-if="advantage.icon === 'dollar'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                <path d="M12 18V6"/>
              </svg>
              <svg v-else-if="advantage.icon === 'building'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
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
            </div>
            <h3 class="text-lg font-semibold mb-2 text-secondary">
              {{ t(advantage.titleKey) }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ t(advantage.descriptionKey) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
