<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const departments = [
  {
    titleKey: 'patientInfo.departments.registrationBudget.title',
    scheduleKey: 'patientInfo.departments.registrationBudget.schedule',
    daysKey: 'patientInfo.departments.registrationBudget.days',
    weekendKey: 'patientInfo.departments.registrationBudget.weekend',
    phone: '62-12-71',
    status: 'working',
  },
  {
    titleKey: 'patientInfo.departments.registrationPaid.title',
    scheduleKey: 'patientInfo.departments.registrationPaid.schedule',
    daysKey: 'patientInfo.departments.registrationPaid.days',
    weekendKey: 'patientInfo.departments.registrationPaid.weekend',
    phone: '62-64-91',
    status: 'working',
  },
  {
    titleKey: 'patientInfo.departments.emergency.title',
    scheduleKey: 'patientInfo.departments.emergency.schedule',
    daysKey: 'patientInfo.departments.emergency.days',
    weekendKey: '',
    phone: '62-15-75',
    status: 'emergency',
  },
  {
    titleKey: 'patientInfo.departments.admission.title',
    scheduleKey: 'patientInfo.departments.admission.schedule',
    daysKey: 'patientInfo.departments.admission.days',
    weekendKey: 'patientInfo.departments.admission.weekend',
    phone: '62-25-61',
    status: 'working',
  },
]
</script>

<template>
  <section class="py-16 bg-gradient-to-b from-background to-muted/30">
    <div class="container-custom">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="section-title">{{ t('patientInfo.title') }}</h2>
          <p class="section-subtitle">
            {{ t('patientInfo.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="(dept, index) in departments"
            :key="index"
            class="relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            :class="[
              dept.status === 'emergency'
                ? 'border-2 border-red-200 bg-red-50/50'
                : 'border-2 border-transparent hover:border-primary/50'
            ]"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-secondary">
                {{ t(dept.titleKey) }}
              </h3>
              <span
                v-if="dept.status === 'emergency'"
                class="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full"
              >
                24/7
              </span>
            </div>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div class="flex-1">
                  <p class="font-semibold text-sm text-gray-700">{{ t('footer.workingHours') }}</p>
                  <p class="text-lg font-bold text-primary">{{ t(dept.scheduleKey) }}</p>
                  <p class="text-sm text-muted-foreground">{{ t(dept.daysKey) }}</p>
                </div>
              </div>

              <div v-if="dept.weekendKey" class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500 mt-0.5 flex-shrink-0">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                  <line x1="16" x2="16" y1="2" y2="6"/>
                  <line x1="8" x2="8" y1="2" y2="6"/>
                  <line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
                <p class="text-sm text-orange-600 font-medium">{{ t(dept.weekendKey) }}</p>
              </div>

              <div class="pt-4 border-t border-muted">
                <div class="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <p class="font-semibold text-sm text-gray-700">{{ t('footer.phone') }}:</p>
                </div>
                <a
                  :href="`tel:${dept.phone}`"
                  class="text-lg font-bold text-primary hover:text-primary/80 transition-colors hover:underline"
                >
                  {{ dept.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl bg-blue-50/50 border border-blue-200 p-6">
          <div class="flex items-start gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mt-1 flex-shrink-0">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div>
              <h3 class="font-semibold text-lg text-blue-900 mb-2">{{ t('patientInfo.contact.title') }}</h3>
              <p class="text-blue-800 mb-2">
                {{ t('patientInfo.contact.address') }}
              </p>
              <p class="text-sm text-blue-600">
                {{ t('patientInfo.contact.importantNote') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
