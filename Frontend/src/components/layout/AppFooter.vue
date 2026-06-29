<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()

const quickLinks = [
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.management', href: '/management' },
  { labelKey: 'nav.prices', href: '/prices' },
  { labelKey: 'nav.vacancies', href: '/vacancies' },
  { labelKey: 'nav.gallery', href: '/gallery' },
  { labelKey: 'nav.video_gallery', href: '/video_gallery' },
  { labelKey: 'nav.renovations', href: '/renovations' },
  { labelKey: 'nav.information', href: '/information' },
  { labelKey: 'nav.contacts', href: '/contacts' },
]
</script>

<template>
  <footer class="bg-secondary text-white">
    <div class="container-custom py-12">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Contact Info -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.contacts') }}</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <p class="font-medium">{{ t('footer.address') }}</p>
                <p class="text-sm opacity-90">{{ t('contact.address.country') }}, {{ t('contact.address.full') }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div>
                <p class="font-medium">{{ t('footer.phone') }}</p>
                <p class="text-sm opacity-90">+996 (312) 62-64-91</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <div>
                <p class="font-medium">{{ t('footer.email') }}</p>
                <p class="text-sm opacity-90">info@clinic.gov.kg</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Working Hours -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.workingHours') }}</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <div>
                <p class="font-medium">{{ t('footer.polyclinic') }}</p>
                <p class="text-sm opacity-90">{{ t('contact.workingHours.weekdays') }}</p>
                <p class="text-sm opacity-90">{{ t('contact.workingHours.saturday') }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <div>
                <p class="font-medium">{{ t('footer.hospital') }}</p>
                <p class="text-sm opacity-90">{{ t('contact.workingHours.roundTheClock') }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0 text-red-400">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect width="18" height="18" x="3" y="4" rx="2"/>
                <path d="M3 10h18"/>
                <path d="m9 16 2 2 4-4"/>
              </svg>
              <div>
                <p class="font-medium">{{ t('footer.emergency') }}</p>
                <p class="text-sm opacity-90">{{ t('contact.workingHours.roundTheClock') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links and Social -->
        <div>
          <h3 class="text-xl font-bold mb-4">{{ t('footer.quickLinks') }}</h3>
          <div class="grid grid-cols-2 gap-2 mb-6">
            <RouterLink
              v-for="link in quickLinks"
              :key="link.href"
              :to="link.href"
              class="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity no-underline text-white"
            >
              {{ t(link.labelKey) }}
            </RouterLink>
          </div>

          <h3 class="text-xl font-bold mb-4">{{ t('footer.followUs') }}</h3>
          <div class="flex gap-3 mb-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                <path d="m10 15 5-3-5-3z"/>
              </svg>
            </a>
          </div>

          <div class="text-sm opacity-90">
            <p class="font-medium mb-1">{{ t('footer.stateInstitution') }}</p>
            <p>{{ t('header.clinicName') }} {{ t('header.presidential') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-white/20">
      <div class="container-custom py-4 flex justify-center items-center text-sm opacity-90">
        <p>&copy; {{ currentYear }} {{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
