<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getVacancyList, type Vacancy } from '@/services/api'

const { t, locale } = useI18n()
const searchQuery = ref('')
const vacancies = ref<Vacancy[]>([])
const loading = ref(true)

const getTitle = (v: Vacancy) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return v.title_kg || v.title_ru || ''
  return v.title_ru || ''
}

const getDepartment = (v: Vacancy) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return v.department_kg || v.department_ru || ''
  return v.department_ru || ''
}

const getSchedule = (v: Vacancy) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return v.schedule_kg || v.schedule_ru || ''
  return v.schedule_ru || ''
}

const getSalary = (v: Vacancy) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return v.salary_kg || v.salary_ru || ''
  return v.salary_ru || ''
}

const filteredVacancies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return vacancies.value

  return vacancies.value.filter((v) =>
    [getTitle(v), getDepartment(v), getSchedule(v), getSalary(v),
     ...(v.requirements || []), ...(v.responsibilities || [])]
      .join(' ')
      .toLowerCase()
      .includes(query),
  )
})

onMounted(async () => {
  try {
    vacancies.value = await getVacancyList()
  } catch (e) {
    console.error('Ошибка загрузки вакансий:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('vacancies.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ t('vacancies.subtitle') }}</p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="max-w-lg">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('vacancies.searchPlaceholder')"
            class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-4 text-muted-foreground">{{ t('common.loading') }}</p>
        </div>

        <div v-else class="grid lg:grid-cols-3 gap-6">
          <article
            v-for="vacancy in filteredVacancies"
            :key="vacancy.id"
            class="rounded-2xl bg-white border-2 border-border hover:border-primary/50 card-shadow card-hover overflow-hidden"
          >
            <div class="p-6 border-b bg-muted/20">
              <h2 class="text-xl font-bold text-secondary mb-3">{{ getTitle(vacancy) }}</h2>
              <div class="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span class="px-2 py-1 rounded-full bg-white border border-border">{{ getDepartment(vacancy) }}</span>
                <span class="px-2 py-1 rounded-full bg-white border border-border">{{ getSchedule(vacancy) }}</span>
                <span class="px-2 py-1 rounded-full bg-primary/10 text-primary">{{ getSalary(vacancy) }}</span>
              </div>
            </div>

            <div class="p-6 space-y-5">
              <div v-if="vacancy.requirements && vacancy.requirements.length">
                <h3 class="font-semibold text-secondary mb-2">{{ t('vacancies.requirements') }}</h3>
                <ul class="space-y-2 text-sm text-muted-foreground">
                  <li v-for="(item, idx) in vacancy.requirements" :key="idx" class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <details v-if="vacancy.responsibilities && vacancy.responsibilities.length">
                <summary class="cursor-pointer text-primary font-semibold text-sm">{{ t('vacancies.responsibilities') }}</summary>
                <ul class="space-y-2 text-sm text-muted-foreground mt-3">
                  <li v-for="(item, idx) in vacancy.responsibilities" :key="idx" class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </details>

              <a href="mailto:hr@clinic.gov.kg" class="btn-primary inline-flex no-underline text-sm">{{ t('vacancies.apply') }}</a>
            </div>
          </article>
        </div>

        <div v-if="!loading && filteredVacancies.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">{{ t('vacancies.notFound') }}</p>
        </div>

        <div class="max-w-4xl mx-auto mt-12 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 border-2 border-primary p-8 text-center">
          <h3 class="text-2xl font-bold mb-4 text-secondary">{{ t('vacancies.noSuitableTitle') }}</h3>
          <p class="text-muted-foreground mb-6">{{ t('vacancies.noSuitableDescription') }}</p>
          <a href="mailto:hr@clinic.gov.kg" class="text-primary hover:underline font-semibold">hr@clinic.gov.kg</a>
        </div>
      </div>
    </section>
  </div>
</template>
