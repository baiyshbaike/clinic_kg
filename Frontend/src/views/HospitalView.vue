<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { hospitalData } from '@/data/clinicStructure'

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
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ hospitalData.title }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ hospitalData.subtitle }}</p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-5xl mx-auto mb-12">
          <h2 class="text-3xl font-bold mb-6 text-secondary">{{ hospitalData.introTitle }}</h2>
          <p
            v-for="paragraph in hospitalData.intro"
            :key="paragraph"
            class="text-lg text-muted-foreground mb-4 leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="stat in hospitalData.stats"
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
        <h2 class="text-3xl font-bold text-center mb-12 text-secondary">Наши отделения</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="dept in hospitalData.departments"
            :key="dept.id"
            class="rounded-2xl border-2 border-border bg-white p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-start justify-between gap-4 mb-4">
              <h3 class="text-xl font-semibold text-secondary">{{ dept.name }}</h3>
              <span class="shrink-0 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                {{ dept.beds }}
              </span>
            </div>
            <p class="text-muted-foreground text-sm mb-4">{{ dept.description }}</p>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li v-for="feature in dept.features" :key="feature" class="flex items-start gap-2">
                <span class="text-primary mt-1">✓</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <h2 class="text-3xl font-bold mb-8 text-secondary">Условия пребывания</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <div
                v-for="condition in hospitalData.conditions"
                :key="condition.title"
                class="rounded-2xl bg-white border border-border p-5 card-shadow"
              >
                <h3 class="font-semibold text-lg mb-2 text-secondary">{{ condition.title }}</h3>
                <p class="text-sm text-muted-foreground">{{ condition.items[0] }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-2xl bg-muted/30 border-l-4 border-l-primary p-8">
            <h2 class="text-3xl font-bold mb-8 text-secondary">Правила госпитализации</h2>
            <div class="space-y-8">
              <div v-for="rule in hospitalData.hospitalizationRules" :key="rule.title">
                <h3 class="font-semibold text-lg mb-3">{{ rule.title }}</h3>
                <ul class="space-y-2 text-muted-foreground">
                  <li v-for="item in rule.items" :key="item" class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
