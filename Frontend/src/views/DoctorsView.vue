<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { doctors, specialtyKeys } from '@/data/doctors'

const { t } = useI18n()
const searchQuery = ref('')
const selectedSpecialty = ref('all')

const specialties = computed(() => ['all', ...specialtyKeys])

const filteredDoctors = computed(() => {
  return doctors.filter((doctor) => {
    const specialtyLabel = t(`specialties.${doctor.specialtyKey}`)
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      specialtyLabel.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSpecialty =
      selectedSpecialty.value === 'all' || doctor.specialtyKey === selectedSpecialty.value
    return matchesSearch && matchesSpecialty
  })
})
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('doctors.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('doctors.subtitle') }}
        </p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('doctors.searchPlaceholder')"
              class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="spec in specialties"
              :key="spec"
              @click="selectedSpecialty = spec"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="[
                selectedSpecialty === spec
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              ]"
            >
              {{ spec === 'all' ? t('doctors.allSpecialties') : t(`specialties.${spec}`) }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
            class="group rounded-2xl bg-white border-2 border-transparent hover:border-primary overflow-hidden card-shadow card-hover"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="doctor.image"
                :alt="doctor.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-1 text-secondary group-hover:text-primary transition-colors">
                {{ doctor.name }}
              </h3>
              <p class="text-primary font-medium mb-2">{{ t(`specialties.${doctor.specialtyKey}`) }}</p>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{{ t('doctors.experience') }}: {{ doctor.experience }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredDoctors.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">{{ t('doctors.notFound') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
