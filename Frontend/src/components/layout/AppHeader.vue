<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import logoImage from '@/assets/images/logo.png'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { navItems } from '@/data/navItems'

const { t } = useI18n()
const route = useRoute()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div>
    <!-- Header -->
    <header class="gradient-secondary text-white shadow-md">
      <div class="container-custom">
        <div class="flex items-center justify-between py-3">
          <RouterLink to="/" class="flex items-center gap-4 no-underline" @click="closeMobileMenu">
            <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white/20 p-2">
              <img
                :src="logoImage"
                :alt="t('header.logoAlt')"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <div class="text-xs opacity-90">{{ t('header.stateInstitution') }}</div>
              <div class="font-bold text-sm md:text-base">{{ t('header.clinicName') }}</div>
              <div class="text-xs opacity-90">{{ t('header.presidential') }}</div>
            </div>
          </RouterLink>

          <div class="flex items-center gap-4">
            <div class="hidden md:flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg hover:bg-white/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg hover:bg-white/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <path d="m10 15 5-3-5-3z"/>
                </svg>
              </a>
            </div>
            <div class="hidden sm:flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span class="font-semibold text-sm md:text-base">+996 (312) 62-64-91</span>
            </div>
            <div class="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>

          <!-- Hamburger - only visible on mobile -->
          <button
            class="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
            @click="toggleMobileMenu"
            :aria-label="isMobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')"
          >
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden bg-secondary border-t border-white/10"
        >
          <div class="container-custom py-4 space-y-1">
            <RouterLink
              v-for="(item, index) in navItems"
              :key="item.href"
              :to="item.href"
              class="block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 no-underline"
              :class="[
                route.path === item.href
                  ? 'text-white bg-white/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              ]"
              :style="{ animationDelay: `${index * 50}ms` }"
              @click="closeMobileMenu"
            >
              {{ t(item.labelKey) }}
            </RouterLink>
            <div class="pt-2 md:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </Transition>
    </header>
  </div>
</template>

<style scoped>
.mobile-menu-enter-active {
  animation: menuSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-leave-active {
  animation: menuSlideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes menuSlideDown {
  0% {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
  }
}

@keyframes menuSlideUp {
  0% {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
  }
}

.mobile-menu-enter-active .block {
  animation: fadeInUp 0.3s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
