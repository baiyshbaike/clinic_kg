<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const services = [
  { titleKey: 'about.services.emergency.title', descKey: 'about.services.emergency.description' },
  { titleKey: 'about.services.surgery.title', descKey: 'about.services.surgery.description' },
  { titleKey: 'about.services.hospitalization.title', descKey: 'about.services.hospitalization.description' },
  { titleKey: 'about.services.polyclinic.title', descKey: 'about.services.polyclinic.description' },
  { titleKey: 'about.services.diagnostics.title', descKey: 'about.services.diagnostics.description' },
  { titleKey: 'about.services.programs.title', descKey: 'about.services.programs.description' },
]

const advantages = [
  { icon: 'award', titleKey: 'about.advantages.quality.title', descKey: 'about.advantages.quality.description' },
  { icon: 'users', titleKey: 'about.advantages.experience.title', descKey: 'about.advantages.experience.description' },
  { icon: 'building', titleKey: 'about.advantages.comfort.title', descKey: 'about.advantages.comfort.description' },
  { icon: 'target', titleKey: 'about.advantages.precision.title', descKey: 'about.advantages.precision.description' },
]
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('about.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('about.subtitle') }}
        </p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
<!--          <div v-html></div>-->
          <p class="text-lg text-muted-foreground mb-8 leading-relaxed">
            {{ t('about.description') }}
          </p>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="p-6 rounded-2xl bg-white border-l-4 border-l-primary card-shadow"
            >
              <h3 class="text-xl font-semibold mb-3 text-secondary">{{ t(service.titleKey) }}</h3>
              <p class="text-muted-foreground">{{ t(service.descKey) }}</p>
            </div>
          </div>

          <div class="mt-8 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
            <p class="text-lg text-muted-foreground leading-relaxed">
              {{ t('about.finalMessage') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-12 text-secondary">{{ t('about.advantagesTitle') }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(advantage, index) in advantages"
            :key="index"
            class="text-center p-6 rounded-2xl bg-white border-2 border-transparent hover:border-primary transition-colors"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
              <svg v-if="advantage.icon === 'award'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
                <circle cx="12" cy="8" r="6"/>
              </svg>
              <svg v-else-if="advantage.icon === 'users'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <svg v-else-if="advantage.icon === 'building'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                <path d="M9 22v-4h6v4"/>
                <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>
              </svg>
              <svg v-else-if="advantage.icon === 'target'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-secondary">{{ t(advantage.titleKey) }}</h3>
            <p class="text-sm text-muted-foreground">{{ t(advantage.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
