<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const isSticky = ref(false)

const navItems = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.management', href: '/management' },
  { labelKey: 'nav.prices', href: '/prices' },
  { labelKey: 'nav.vacancies', href: '/vacancies' },
  { labelKey: 'nav.gallery', href: '/gallery' },
  { labelKey: 'nav.renovations', href: '/renovations' },
  { labelKey: 'nav.information', href: '/information' },
  { labelKey: 'nav.contacts', href: '/contacts' },
]

const handleScroll = () => {
  isSticky.value = window.scrollY > 150
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="border-t border-white/10 backdrop-blur-sm transition-all duration-300 z-40"
    :class="[
      isSticky
        ? 'bg-secondary shadow-lg fixed top-0 left-0 right-0'
        : 'bg-secondary/90'
    ]"
  >
    <div class="container-custom">
      <div class="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
        <RouterLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 no-underline"
          :class="[
            route.path === item.href
              ? 'text-white bg-white/20'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          ]"
        >
          {{ t(item.labelKey) }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
