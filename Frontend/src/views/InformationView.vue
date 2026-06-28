<script setup lang="ts">
import { informationCards, patientFaq, patientRights } from '@/data/information'
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Информация</h1>
        <p class="text-xl opacity-90 max-w-3xl">Полезная информация для пациентов</p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="card in informationCards"
            :key="card.title"
            class="text-center rounded-2xl bg-white border-2 border-transparent hover:border-primary/40 p-6 card-shadow"
          >
            <div class="w-14 h-14 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
              {{ card.title.slice(0, 1) }}
            </div>
            <h2 class="text-lg font-semibold text-secondary mb-2">{{ card.title }}</h2>
            <p class="text-sm text-muted-foreground">{{ card.description }}</p>
          </div>
        </div>

        <div class="grid lg:grid-cols-[1fr_360px] gap-8 max-w-6xl mx-auto">
          <div>
            <h2 class="text-3xl font-bold mb-8 text-secondary">Часто задаваемые вопросы</h2>
            <div class="space-y-4">
              <details
                v-for="item in patientFaq"
                :key="item.question"
                class="rounded-2xl bg-white border border-border p-6 card-shadow"
              >
                <summary class="cursor-pointer text-lg font-semibold text-secondary hover:text-primary">
                  {{ item.question }}
                </summary>
                <p class="text-muted-foreground mt-4 leading-relaxed">{{ item.answer }}</p>
              </details>
            </div>
          </div>

          <aside class="rounded-2xl bg-muted/30 border-l-4 border-l-primary p-6 h-fit">
            <h2 class="text-2xl font-bold mb-5 text-secondary">Права пациента</h2>
            <ul class="space-y-3 text-muted-foreground">
              <li v-for="right in patientRights" :key="right" class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span>{{ right }}</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
