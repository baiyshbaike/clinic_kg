<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getManagementList, type ManagementMember } from '@/services/api'

const { t, locale } = useI18n()
const members = ref<ManagementMember[]>([])
const loading = ref(true)
const expandedMemberId = ref<number | null>(null)

const getName = (member: ManagementMember) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return member.name_kg || member.name_ru || ''
  return member.name_ru || ''
}

const getJobTitle = (member: ManagementMember) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return member.job_title_kg || member.job_title_ru || ''
  return member.job_title_ru || ''
}

const getContent = (member: ManagementMember) => {
  const lang = locale.value
  if (lang === 'ky' || lang === 'kg') return member.content_kg || member.content_ru || ''
  return member.content_ru || ''
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2)
}

const toggleMember = (memberId: number) => {
  expandedMemberId.value = expandedMemberId.value === memberId ? null : memberId
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

        <div v-else class="max-w-6xl mx-auto">
          <div class="space-y-6">
            <article
              v-for="member in members"
              :key="member.id"
              class="rounded-2xl bg-white border-2 overflow-hidden card-shadow card-hover transition-colors"
              :class="expandedMemberId === member.id ? 'border-primary/50' : 'border-transparent hover:border-primary/40'"
            >
              <div class="flex flex-col md:flex-row gap-6 p-5 md:p-6 min-h-[220px]">
                <div class="w-full md:w-[180px] flex-shrink-0">
                  <div v-if="member.image_url" class="h-[240px] md:h-[220px] w-full overflow-hidden rounded-xl bg-muted">
                    <img
                      :src="member.image_url"
                      :alt="getName(member)"
                      class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div v-else class="h-[240px] md:h-[220px] w-full rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span class="text-3xl font-bold text-primary">
                      {{ getInitials(getName(member)) }}
                    </span>
                  </div>
                </div>

                <div class="flex-1 flex flex-col justify-between gap-6 min-w-0 py-1 md:py-3">
                  <div>
                    <span class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                      {{ t('management.title') }}
                    </span>
                    <h3 class="text-xl md:text-2xl font-bold text-secondary leading-snug mb-4">
                      {{ getJobTitle(member) }}
                    </h3>
                    <div class="flex items-center gap-3 text-base md:text-lg text-foreground">
                      <span class="h-0.5 w-8 rounded-full bg-primary flex-shrink-0"></span>
                      <span class="font-semibold break-words">{{ getName(member) }}</span>
                    </div>
                  </div>

                  <div class="flex justify-start md:justify-end">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center gap-3 text-sm min-w-[172px] no-underline"
                      :class="expandedMemberId === member.id ? 'btn-primary' : 'btn-outline'"
                      :aria-expanded="expandedMemberId === member.id"
                      @click="toggleMember(member.id)"
                    >
                      {{ expandedMemberId === member.id ? t('management.collapse') : t('management.learnMore') }}
                      <svg
                        class="h-4 w-4 transition-transform"
                        :class="{ 'rotate-180': expandedMemberId === member.id }"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="expandedMemberId === member.id"
                class="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 px-5 py-6 md:px-6"
              >
                <div class="md:ml-[204px] space-y-5">
                  <div v-if="getContent(member)" class="management-detail text-foreground" v-html="getContent(member)"></div>
                  <p v-else class="text-muted-foreground">
                    {{ t('management.noDetails') }}
                  </p>

                  <div v-if="member.phone || member.email" class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      v-if="member.phone"
                      :href="`tel:${member.phone}`"
                      class="inline-flex items-center gap-2 rounded-lg bg-white border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors no-underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      {{ member.phone }}
                    </a>

                    <a
                      v-if="member.email"
                      :href="`mailto:${member.email}`"
                      class="inline-flex items-center gap-2 rounded-lg bg-white border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors no-underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                      {{ member.email }}
                    </a>
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

<style scoped>
.management-detail :deep(*) {
  max-width: 100%;
}

.management-detail :deep(p) {
  margin-bottom: 0.875rem;
  line-height: 1.75;
  color: var(--color-muted-foreground);
}

.management-detail :deep(ul),
.management-detail :deep(ol) {
  margin: 0 0 0.875rem 1.25rem;
  color: var(--color-muted-foreground);
}

.management-detail :deep(li) {
  margin-bottom: 0.375rem;
}

.management-detail :deep(strong),
.management-detail :deep(b) {
  color: var(--color-foreground);
}

.management-detail :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
}
</style>
