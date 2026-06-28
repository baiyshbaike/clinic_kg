<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { polyclinicData } from '@/data/clinicStructure'

const { t } = useI18n()
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
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ polyclinicData.title }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ polyclinicData.subtitle }}</p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-5xl mx-auto mb-12">
          <h2 class="text-3xl font-bold mb-6 text-secondary">{{ polyclinicData.introTitle }}</h2>
          <p
            v-for="paragraph in polyclinicData.intro"
            :key="paragraph"
            class="text-lg text-muted-foreground mb-4 leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div
            v-for="stat in polyclinicData.stats"
            :key="stat.label"
            class="text-center p-6 rounded-2xl bg-muted/30 border-2 border-transparent hover:border-primary/40 transition-colors"
          >
            <div class="text-3xl font-bold text-primary mb-1">{{ stat.value }}</div>
            <div class="font-semibold text-secondary">{{ stat.label }}</div>
            <p class="text-sm text-muted-foreground mt-2">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-12 text-secondary">Отделения поликлиники</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="dept in polyclinicData.departments"
            :key="dept.id"
            class="rounded-2xl border-2 border-border bg-white p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 text-white font-bold">
              {{ dept.name.slice(0, 1) }}
            </div>
            <h3 class="text-xl font-semibold mb-2 text-secondary">{{ dept.name }}</h3>
            <p class="text-muted-foreground text-sm mb-4">{{ dept.description }}</p>
            <div class="space-y-2 text-sm text-muted-foreground">
              <p v-if="dept.meta" class="flex items-center gap-2">
                <span class="text-primary">•</span>
                {{ dept.meta }}
              </p>
              <p v-if="dept.schedule" class="flex items-center gap-2">
                <span class="text-primary">•</span>
                {{ dept.schedule }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-[1fr_380px] gap-8 max-w-6xl mx-auto">
          <div class="rounded-2xl bg-white border border-border card-shadow p-8">
            <h2 class="text-2xl font-bold mb-6 text-secondary">Наши услуги</h2>
            <ul class="grid md:grid-cols-2 gap-3">
              <li
                v-for="service in polyclinicData.services"
                :key="service"
                class="flex items-start gap-2 text-muted-foreground"
              >
                <span class="text-primary mt-1">✓</span>
                <span>{{ service }}</span>
              </li>
            </ul>
          </div>

          <aside class="rounded-2xl bg-white border-2 border-primary/20 card-shadow overflow-hidden">
            <img
              :src="polyclinicData.head.photo"
              :alt="polyclinicData.head.name"
              class="w-full h-80 object-cover"
            />
            <div class="p-6">
              <p class="text-sm text-primary font-semibold mb-1">{{ polyclinicData.head.position }}</p>
              <h2 class="text-2xl font-bold text-secondary mb-4">{{ polyclinicData.head.name }}</h2>
              <div class="space-y-2 text-sm text-muted-foreground">
                <p v-if="polyclinicData.head.qualification">{{ polyclinicData.head.qualification }}</p>
                <p v-if="polyclinicData.head.experience">{{ polyclinicData.head.experience }}</p>
              </div>
              <div v-if="polyclinicData.head.achievements?.length" class="pt-4 mt-4 border-t">
                <p class="font-semibold mb-2">Достижения:</p>
                <ul class="space-y-1 text-sm text-muted-foreground">
                  <li v-for="achievement in polyclinicData.head.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
