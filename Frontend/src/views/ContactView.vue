<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { submitContactForm } from '@/services/api'

const { t } = useI18n()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const serverError = ref('')

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.name.trim() || formData.value.name.trim().length < 2) {
    errors.value.name = 'Имя должно содержать минимум 2 символа.'
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!formData.value.email.trim()) {
    errors.value.email = 'Обязательное поле.'
  } else if (!emailRegex.test(formData.value.email.trim())) {
    errors.value.email = 'Введите корректный адрес электронной почты.'
  }

  const cleanedPhone = formData.value.phone.replace(/[\s\-\(\)\+]/g, '')
  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Обязательное поле.'
  } else if (!/^\d{7,}$/.test(cleanedPhone)) {
    errors.value.phone = 'Введите корректный номер телефона.'
  }

  if (!formData.value.message.trim()) {
    errors.value.message = 'Обязательное поле.'
  } else if (formData.value.message.trim().length < 5) {
    errors.value.message = 'Сообщение должно содержать минимум 5 символов.'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  serverError.value = ''
  if (!validateForm()) return

  isSubmitting.value = true
  try {
    await submitContactForm({
      name: formData.value.name.trim(),
      email: formData.value.email.trim().toLowerCase(),
      phone: formData.value.phone.trim(),
      message: formData.value.message.trim(),
    })
    isSubmitted.value = true
    formData.value = { name: '', email: '', phone: '', message: '' }
    errors.value = {}
    setTimeout(() => { isSubmitted.value = false }, 5000)
  } catch (e: any) {
    if (e.response?.data) {
      const data = e.response.data
      if (typeof data === 'object') {
        const fieldErrors: Record<string, string> = {}
        for (const key in data) {
          if (Array.isArray(data[key])) {
            fieldErrors[key] = data[key][0]
          } else if (typeof data[key] === 'string') {
            serverError.value = data[key]
          }
        }
        errors.value = { ...errors.value, ...fieldErrors }
      }
    } else {
      serverError.value = 'Произошла ошибка. Попробуйте позже.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('contact.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ t('contact.subtitle') }}</p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div class="space-y-6">
            <h2 class="text-3xl font-bold text-secondary mb-6">{{ t('contact.info') }}</h2>

            <div class="p-6 rounded-2xl bg-white border-l-4 border-l-primary card-shadow">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1">{{ t('contact.address.title') }}</h3>
                  <p class="text-muted-foreground">
                    {{ t('contact.address.country') }}<br />
                    {{ t('contact.address.full') }}
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-white border-l-4 border-l-primary card-shadow">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1">{{ t('contact.phones.title') }}</h3>
                  <div class="space-y-1 text-muted-foreground">
                    <p>{{ t('contact.phones.registry') }}: <a href="tel:+996312663549" class="text-primary hover:underline">+996 (312) 66-35-49</a></p>
                    <p>{{ t('contact.phones.reception') }}: <a href="tel:+996312663550" class="text-primary hover:underline">+996 (312) 66-35-50</a></p>
                    <p>{{ t('contact.phones.emergency') }}: <a href="tel:103" class="text-primary hover:underline font-semibold">103</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-white border-l-4 border-l-primary card-shadow">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1">{{ t('contact.email.title') }}</h3>
                  <div class="space-y-1 text-muted-foreground">
                    <p><a href="mailto:info@clinic.gov.kg" class="text-primary hover:underline">info@clinic.gov.kg</a></p>
                    <p><a href="mailto:reception@clinic.gov.kg" class="text-primary hover:underline">reception@clinic.gov.kg</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-white border-l-4 border-l-primary card-shadow">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1">{{ t('contact.workingHours.title') }}</h3>
                  <div class="space-y-1 text-muted-foreground">
                    <p><strong>{{ t('contact.workingHours.polyclinic') }}:</strong></p>
                    <p>{{ t('contact.workingHours.weekdays') }}</p>
                    <p>{{ t('contact.workingHours.saturday') }}</p>
                    <p class="mt-2"><strong>{{ t('contact.workingHours.hospital') }}:</strong> {{ t('contact.workingHours.roundTheClock') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="rounded-2xl border-2 border-primary/20 overflow-hidden card-shadow">
              <div class="p-6 bg-muted/30">
                <h3 class="text-2xl font-bold text-secondary">{{ t('contact.form.title') }}</h3>
              </div>
              <div class="p-6">
                <div v-if="serverError" class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {{ serverError }}
                </div>

                <div v-if="isSubmitted" class="mb-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  {{ t('contact.form.success') }}
                </div>

                <form v-else @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.name') }} *</label>
                    <input
                      v-model="formData.name"
                      type="text"
                      :placeholder="t('contact.form.namePlaceholder')"
                      class="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      :class="errors.name ? 'border-red-500' : 'border-border focus:border-primary'"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.email') }} *</label>
                    <input
                      v-model="formData.email"
                      type="text"
                      :placeholder="t('contact.form.emailPlaceholder')"
                      class="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      :class="errors.email ? 'border-red-500' : 'border-border focus:border-primary'"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.phone') }} *</label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      :placeholder="t('contact.form.phonePlaceholder')"
                      class="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      :class="errors.phone ? 'border-red-500' : 'border-border focus:border-primary'"
                    />
                    <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.message') }} *</label>
                    <textarea
                      v-model="formData.message"
                      :placeholder="t('contact.form.messagePlaceholder')"
                      rows="5"
                      class="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      :class="errors.message ? 'border-red-500' : 'border-border focus:border-primary'"
                    ></textarea>
                    <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
                  </div>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z"/>
                      <path d="M22 2 11 13"/>
                    </svg>
                    <span v-if="isSubmitting">{{ t('contact.form.submitting') }}</span>
                    <span v-else>{{ t('contact.form.submit') }}</span>
                  </button>
                </form>
              </div>
            </div>

            <div class="mt-6 p-6 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 border-2 border-primary/20">
              <h3 class="font-semibold text-lg mb-3 text-secondary">{{ t('contact.map.title') }}</h3>
              <p class="text-muted-foreground text-sm mb-4">
                {{ t('contact.map.description') }}
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ t('contact.map.direction') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
