<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getManagementList, type ManagementMember } from '@/services/api'

const { t, locale } = useI18n()
const members = ref<ManagementMember[]>([])
const loading = ref(true)

const getName = (member: ManagementMember) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return member.name_kg || member.name_ru || ''
  if (lang === 'en') return member.name_en || member.name_ru || ''
  return member.name_ru || ''
}

const getJobTitle = (member: ManagementMember) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return member.job_title_kg || member.job_title_ru || ''
  if (lang === 'en') return member.job_title_en || member.job_title_ru || ''
  return member.job_title_ru || ''
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2)
}

onMounted(async () => {
  try {
    members.value = await getManagementList()
  } catch (e) {
    console.error('Ошибка загрузки руководства:', e)
  } finally {
    loading.value = false
  }
})
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
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('management.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('management.subtitle') }}
        </p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-4 text-muted-foreground">{{ t('common.loading') }}</p>
        </div>

        <div v-else class="max-w-5xl mx-auto">
          <div class="grid md:grid-cols-2 gap-6">
            <article
              v-for="member in members"
              :key="member.id"
              class="rounded-2xl bg-white border-2 border-border overflow-hidden card-shadow hover:border-primary/40 transition-colors"
            >
              <div v-if="member.image_url" class="h-48 overflow-hidden">
                <img
                  :src="member.image_url"
                  :alt="getName(member)"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="p-6">
                <div class="flex items-start gap-4">
                  <div v-if="!member.image_url" class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span class="text-2xl font-bold text-primary">
                      {{ getInitials(getName(member)) }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-secondary mb-1">{{ getName(member) }}</h3>
                    <p class="text-primary font-semibold mb-3">{{ getJobTitle(member) }}</p>
                    <div class="space-y-2">
                      <a
                        v-if="member.phone"
                        :href="`tel:${member.phone}`"
                        class="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        {{ member.phone }}
                      </a>
                      <a
                        v-if="member.email"
                        :href="`mailto:${member.email}`"
                        class="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2"/>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        {{ member.email }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6 text-secondary">{{ t('management.contactTitle') }}</h2>
          <p class="text-muted-foreground mb-8">
            {{ t('management.contactDescription') }}
          </p>
          <RouterLink to="/contacts" class="btn-primary inline-flex no-underline">
            {{ t('nav.contacts') }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
