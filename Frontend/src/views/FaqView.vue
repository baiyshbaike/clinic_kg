<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { patientFaq } from '@/data/information'

const { t } = useI18n()
const openFaq = ref<number | null>(null)

const toggleFaq = (id: number) => {
  openFaq.value = openFaq.value === id ? null : id
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('nav.faq') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('information.subtitle') }}
        </p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <div class="space-y-4">
            <div
              v-for="(faq, index) in patientFaq"
              :key="faq.question"
              class="rounded-2xl border-2 overflow-hidden transition-colors"
              :class="[
                openFaq === index ? 'border-primary' : 'border-border'
              ]"
            >
              <button
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
              >
                <span class="font-semibold text-foreground">{{ faq.question }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="flex-shrink-0 transition-transform duration-300"
                  :class="[
                    openFaq === index ? 'rotate-180' : ''
                  ]"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <Transition name="faq">
                <div
                  v-if="openFaq === index"
                  class="px-6 pb-4 text-muted-foreground"
                >
                  {{ faq.answer }}
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-muted/30">
      <div class="container-custom text-center">
        <h2 class="text-2xl font-bold mb-4 text-secondary">{{ t('contact.form.title') }}</h2>
        <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {{ t('contact.subtitle') }}
        </p>
        <RouterLink to="/contact" class="btn-primary inline-flex items-center gap-2 no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          {{ t('contact.phones.registry') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.faq-enter-to,
.faq-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
