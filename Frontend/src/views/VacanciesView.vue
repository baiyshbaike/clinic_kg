<script setup lang="ts">
import { computed, ref } from 'vue'
import { vacancies } from '@/data/vacancies'

const searchQuery = ref('')

const filteredVacancies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return vacancies

  return vacancies.filter((vacancy) =>
    [
      vacancy.title,
      vacancy.department,
      vacancy.schedule,
      vacancy.salary,
      ...vacancy.requirements,
      ...vacancy.responsibilities,
    ]
      .join(' ')
      .toLowerCase()
      .includes(query),
  )
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Вакансии</h1>
        <p class="text-xl opacity-90 max-w-3xl">Присоединяйтесь к нашей команде профессионалов</p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="max-w-lg">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск вакансии..."
            class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-6">
          <article
            v-for="vacancy in filteredVacancies"
            :key="`${vacancy.title}-${vacancy.department}`"
            class="rounded-2xl bg-white border-2 border-border hover:border-primary/50 card-shadow card-hover overflow-hidden"
          >
            <div class="p-6 border-b bg-muted/20">
              <h2 class="text-xl font-bold text-secondary mb-3">{{ vacancy.title }}</h2>
              <div class="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span class="px-2 py-1 rounded-full bg-white border border-border">{{ vacancy.department }}</span>
                <span class="px-2 py-1 rounded-full bg-white border border-border">{{ vacancy.schedule }}</span>
                <span class="px-2 py-1 rounded-full bg-primary/10 text-primary">{{ vacancy.salary }}</span>
              </div>
            </div>

            <div class="p-6 space-y-5">
              <div>
                <h3 class="font-semibold text-secondary mb-2">Требования</h3>
                <ul class="space-y-2 text-sm text-muted-foreground">
                  <li v-for="item in vacancy.requirements" :key="item" class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <details v-if="vacancy.responsibilities.length">
                <summary class="cursor-pointer text-primary font-semibold text-sm">Обязанности</summary>
                <ul class="space-y-2 text-sm text-muted-foreground mt-3">
                  <li v-for="item in vacancy.responsibilities" :key="item" class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </details>

              <a href="mailto:hr@clinic.gov.kg" class="btn-primary inline-flex no-underline text-sm">Откликнуться</a>
            </div>
          </article>
        </div>

        <div v-if="filteredVacancies.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">Вакансии не найдены</p>
        </div>

        <div class="max-w-4xl mx-auto mt-12 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 border-2 border-primary p-8 text-center">
          <h3 class="text-2xl font-bold mb-4 text-secondary">Не нашли подходящую вакансию?</h3>
          <p class="text-muted-foreground mb-6">Отправьте резюме, и мы свяжемся с вами, когда появится подходящая позиция.</p>
          <a href="mailto:hr@clinic.gov.kg" class="text-primary hover:underline font-semibold">hr@clinic.gov.kg</a>
        </div>
      </div>
    </section>
  </div>
</template>
