<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    formData.value = { name: '', email: '', phone: '', message: '' }
    setTimeout(() => {
      isSubmitted.value = false
    }, 3000)
  }, 1500)
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('contact.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('contact.subtitle') }}
        </p>
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
                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.name') }}</label>
                    <input
                      v-model="formData.name"
                      type="text"
                      :placeholder="t('contact.form.namePlaceholder')"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.email') }}</label>
                    <input
                      v-model="formData.email"
                      type="email"
                      :placeholder="t('contact.form.emailPlaceholder')"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.phone') }}</label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      :placeholder="t('contact.form.phonePlaceholder')"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-2 block">{{ t('contact.form.message') }}</label>
                    <textarea
                      v-model="formData.message"
                      :placeholder="t('contact.form.messagePlaceholder')"
                      rows="5"
                      required
                      class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    ></textarea>
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
                    <span v-else-if="isSubmitted">{{ t('contact.form.success') }}</span>
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
