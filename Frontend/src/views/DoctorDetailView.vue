<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { doctors } from '@/data/doctors'

const { t } = useI18n()
const route = useRoute()

const doctor = computed(() => {
  const id = Number(route.params.id)
  return doctors.find((d) => d.id === id)
})

const relatedDoctors = computed(() => {
  if (!doctor.value) return []
  return doctors
    .filter((d) => d.id !== doctor.value!.id && d.specialtyKey === doctor.value!.specialtyKey)
    .slice(0, 3)
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <RouterLink to="/doctors" class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          {{ t('doctors.title') }}
        </RouterLink>
        <h1 v-if="doctor" class="text-3xl md:text-4xl font-bold mb-4">{{ doctor.name }}</h1>
      </div>
    </div>

    <section class="py-16" v-if="doctor">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Doctor Image -->
            <div class="md:col-span-1">
              <div class="rounded-2xl overflow-hidden card-shadow">
                <img
                  :src="doctor.image"
                  :alt="doctor.name"
                  class="w-full h-auto object-cover"
                />
              </div>
            </div>

            <!-- Doctor Info -->
            <div class="md:col-span-2">
              <h2 class="text-2xl font-bold mb-4 text-secondary">{{ doctor.name }}</h2>

              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">{{ t('specialties.' + doctor.specialtyKey) }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">{{ t('doctors.experience') }}: {{ doctor.experience }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-8">
                <RouterLink
                  to="/appointment"
                  class="btn-primary inline-flex items-center gap-2 no-underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                  {{ t('appointment.form.submit') }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Doctors -->
    <section v-if="relatedDoctors.length > 0" class="py-16 bg-muted/30">
      <div class="container-custom">
        <h2 class="text-2xl font-bold mb-8 text-secondary">{{ t('doctors.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <RouterLink
            v-for="doc in relatedDoctors"
            :key="doc.id"
            :to="`/doctors/${doc.id}`"
            class="group rounded-2xl bg-white border-2 border-transparent hover:border-primary overflow-hidden card-shadow card-hover no-underline"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="doc.image"
                :alt="doc.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-foreground group-hover:text-primary transition-colors">
                {{ doc.name }}
              </h3>
              <p class="text-sm text-primary">{{ t('specialties.' + doc.specialtyKey) }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section v-else class="py-16">
      <div class="container-custom text-center">
        <h2 class="text-2xl font-bold mb-4">{{ t('common.notFound') }}</h2>
        <RouterLink to="/doctors" class="btn-primary no-underline">
          {{ t('doctors.title') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>
