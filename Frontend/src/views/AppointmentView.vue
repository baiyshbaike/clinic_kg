<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { doctors } from '@/data/doctors'

const { t } = useI18n()

const formData = ref({
  name: '',
  phone: '',
  email: '',
  doctor: '',
  date: '',
  time: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
]

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    formData.value = { name: '', phone: '', email: '', doctor: '', date: '', time: '', message: '' }
    setTimeout(() => {
      isSubmitted.value = false
    }, 5000)
  }, 1500)
}

const getMinDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('appointment.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('appointment.subtitle') }}
        </p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <div v-if="isSubmitted" class="p-8 rounded-2xl bg-green-50 border-2 border-green-200 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-green-800 mb-2">{{ t('appointment.success.title') }}</h2>
            <p class="text-green-700 mb-4">
              {{ t('appointment.success.message') }}
            </p>
            <p class="text-sm text-green-600">
              {{ t('appointment.success.info') }}
            </p>
          </div>

          <div v-else class="rounded-2xl border-2 border-primary/20 overflow-hidden card-shadow">
            <div class="p-6 bg-muted/30">
              <h2 class="text-2xl font-bold text-secondary">{{ t('appointment.form.title') }}</h2>
              <p class="text-muted-foreground mt-1">{{ t('appointment.form.description') }}</p>
            </div>
            <div class="p-6">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('appointment.form.name') }}</label>
                    <input
                      v-model="formData.name"
                      type="text"
                      :placeholder="t('appointment.form.namePlaceholder')"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('appointment.form.phone') }}</label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      :placeholder="t('appointment.form.phonePlaceholder')"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="text-sm font-medium mb-2 block">{{ t('appointment.form.email') }}</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    :placeholder="t('appointment.form.emailPlaceholder')"
                    class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label class="text-sm font-medium mb-2 block">{{ t('appointment.form.doctor') }}</label>
                  <select
                    v-model="formData.doctor"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  >
                    <option value="" disabled>{{ t('appointment.form.doctorPlaceholder') }}</option>
                    <option v-for="doc in doctors" :key="doc.id" :value="doc.name">
                      {{ doc.name }} - {{ t(`specialties.${doc.specialtyKey}`) }}
                    </option>
                  </select>
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('appointment.form.date') }}</label>
                    <input
                      v-model="formData.date"
                      type="date"
                      :min="getMinDate()"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('appointment.form.time') }}</label>
                    <select
                      v-model="formData.time"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    >
                      <option value="" disabled>{{ t('appointment.form.timePlaceholder') }}</option>
                      <option v-for="slot in timeSlots" :key="slot" :value="slot">
                        {{ slot }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="text-sm font-medium mb-2 block">{{ t('appointment.form.message') }}</label>
                  <textarea
                    v-model="formData.message"
                    :placeholder="t('appointment.form.messagePlaceholder')"
                    rows="4"
                    class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div class="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mt-0.5 flex-shrink-0">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4"/>
                      <path d="M12 8h.01"/>
                    </svg>
                    <div class="text-sm text-blue-800">
                      <p class="font-medium mb-1">{{ t('appointment.important.title') }}</p>
                      <p>{{ t('appointment.important.description') }}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                >
                  <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                  <span v-if="isSubmitting">{{ t('appointment.form.submitting') }}</span>
                  <span v-else>{{ t('appointment.form.submit') }}</span>
                </button>
              </form>
            </div>
          </div>

          <div class="mt-8 grid md:grid-cols-3 gap-4">
            <div class="p-4 rounded-xl bg-muted/30 text-center">
              <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <p class="font-medium text-sm">{{ t('appointment.info.phone') }}</p>
              <a href="tel:+996312626491" class="text-primary text-sm hover:underline no-underline">{{ t('appointment.info.phoneValue') }}</a>
            </div>
            <div class="p-4 rounded-xl bg-muted/30 text-center">
              <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <p class="font-medium text-sm">{{ t('appointment.info.hours') }}</p>
              <p class="text-muted-foreground text-sm">{{ t('appointment.info.hoursValue') }}</p>
            </div>
            <div class="p-4 rounded-xl bg-muted/30 text-center">
              <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <p class="font-medium text-sm">{{ t('appointment.info.address') }}</p>
              <p class="text-muted-foreground text-sm">{{ t('appointment.info.addressValue') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
