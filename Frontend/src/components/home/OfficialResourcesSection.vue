<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const resources = [
  {
    id: 1,
    title: 'Министерство здравоохранения КР',
    url: 'https://www.moh.kg',
    image: '🏥',
    isExternal: true,
  },
  {
    id: 2,
    title: 'Департамент здравоохранения Бишкека',
    url: 'https://bishkek.gov.kg',
    image: '🏛️',
    isExternal: true,
  },
  {
    id: 3,
    title: 'Социальный фонд КР',
    url: 'https://www.sfr.kg',
    image: '📋',
    isExternal: true,
  },
  {
    id: 4,
    title: 'Центр здоровья',
    url: '/services',
    image: '❤️',
    isExternal: false,
  },
  {
    id: 5,
    title: 'Программа государственных гарантий',
    url: '/faq',
    image: '📜',
    isExternal: false,
  },
  {
    id: 6,
    title: 'Портал открытых данных',
    url: 'https://data.gov.kg',
    image: '📊',
    isExternal: true,
  },
]
</script>

<template>
  <section class="py-16 bg-background">
    <div class="container-custom">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          {{ t('officialResources.title') }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <a
            v-for="resource in resources"
            :key="resource.id"
            :href="resource.url"
            :target="resource.isExternal ? '_blank' : '_self'"
            :rel="resource.isExternal ? 'noopener noreferrer' : ''"
            class="block group"
            :title="resource.title"
          >
            <div class="rounded-2xl border-2 border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg relative">
              <div class="relative w-full h-auto bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center min-h-[120px] max-h-[180px]">
                <span class="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {{ resource.image }}
                </span>
                <div class="absolute inset-0 bg-black/5"></div>
                <div v-if="resource.isExternal" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="bg-black/50 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" x2="21" y1="14" y2="3"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-4 text-center">
                <p class="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {{ resource.title }}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
