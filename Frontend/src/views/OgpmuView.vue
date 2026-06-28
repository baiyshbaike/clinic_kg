<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { ogpmuData } from '@/data/clinicStructure'
import { doctors } from '@/data/doctors'

const { t } = useI18n()
const ogpmuDoctors = computed(() => doctors.filter((doctor) => doctor.department === 'ОГПМУ'))
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
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ ogpmuData.title }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ ogpmuData.subtitle }}</p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-secondary">{{ ogpmuData.introTitle }}</h2>
          <p
            v-for="paragraph in ogpmuData.intro"
            :key="paragraph"
            class="text-lg text-muted-foreground mb-4 leading-relaxed"
          >
            {{ paragraph }}
          </p>
          <div class="rounded-2xl bg-muted/30 border-l-4 border-l-primary p-6 mt-8">
            <h3 class="text-xl font-bold mb-4 text-secondary">Основные задачи</h3>
            <ul class="space-y-3 text-muted-foreground">
              <li v-for="task in ogpmuData.tasks" :key="task" class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span>{{ task }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-12 text-secondary">Структура отделения</h2>
        <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <article
            v-for="block in ogpmuData.structure"
            :key="block.title"
            class="rounded-2xl bg-white border-2 border-primary/20 p-6 card-shadow"
          >
            <h3 class="text-2xl font-bold text-secondary mb-5">{{ block.title }}</h3>
            <ul class="space-y-3 text-muted-foreground">
              <li v-for="item in block.items" :key="item" class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-[360px_1fr] gap-8 max-w-6xl mx-auto">
          <aside class="rounded-2xl bg-white border-2 border-primary/20 card-shadow overflow-hidden">
            <img
              :src="ogpmuData.head.photo"
              :alt="ogpmuData.head.name"
              class="w-full h-80 object-cover"
            />
            <div class="p-6">
              <p class="text-sm text-primary font-semibold mb-1">{{ ogpmuData.head.position }}</p>
              <h2 class="text-2xl font-bold text-secondary mb-4">{{ ogpmuData.head.name }}</h2>
              <p class="text-sm text-muted-foreground">{{ ogpmuData.head.qualification }}</p>
              <p class="text-sm text-muted-foreground mt-1">{{ ogpmuData.head.experience }}</p>
            </div>
          </aside>

          <div>
            <h2 class="text-3xl font-bold mb-8 text-secondary">Наши специалисты</h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <article
                v-for="doctor in ogpmuDoctors"
                :key="doctor.id"
                class="rounded-2xl bg-white border border-border overflow-hidden card-shadow"
              >
                <img :src="doctor.image" :alt="doctor.name" class="w-full h-56 object-cover" />
                <div class="p-4">
                  <h3 class="font-semibold text-secondary">{{ doctor.name }}</h3>
                  <p class="text-sm text-primary">{{ t(`specialties.${doctor.specialtyKey}`) }}</p>
                  <p class="text-sm text-muted-foreground mt-2">Стаж: {{ doctor.experience }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-12 text-secondary">Наши преимущества</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div
            v-for="advantage in ogpmuData.advantages"
            :key="advantage.label"
            class="text-center rounded-2xl bg-white p-6 border-2 border-transparent hover:border-primary/40 transition-colors"
          >
            <div class="text-2xl font-bold text-primary mb-1">{{ advantage.value }}</div>
            <div class="font-semibold text-secondary">{{ advantage.label }}</div>
            <p class="text-sm text-muted-foreground mt-2">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div>
            <h2 class="text-3xl font-bold mb-6 text-secondary">Наши услуги</h2>
            <ul class="space-y-3">
              <li
                v-for="service in ogpmuData.services"
                :key="service"
                class="rounded-xl bg-white border border-border p-4 text-muted-foreground card-shadow"
              >
                {{ service }}
              </li>
            </ul>
          </div>
          <div>
            <h2 class="text-3xl font-bold mb-6 text-secondary">Современное оборудование</h2>
            <ul class="space-y-3">
              <li
                v-for="item in ogpmuData.equipment"
                :key="item"
                class="rounded-xl bg-white border border-border p-4 text-muted-foreground card-shadow"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-8 text-secondary">Контакты отделения</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div
            v-for="contact in ogpmuData.contacts"
            :key="contact.title"
            class="rounded-2xl bg-white p-5 border border-border card-shadow"
          >
            <p class="text-sm text-muted-foreground">{{ contact.title }}</p>
            <p class="text-lg font-semibold text-secondary mt-1">{{ contact.value }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
