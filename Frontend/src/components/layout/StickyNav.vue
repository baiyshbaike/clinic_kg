<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { navItems } from '@/data/navItems'

const { t } = useI18n()
const route = useRoute()
</script>

<template>
  <nav
    class="sticky top-0 hidden md:block border-t border-white/10 bg-secondary/95 shadow-sm backdrop-blur-sm z-40"
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
