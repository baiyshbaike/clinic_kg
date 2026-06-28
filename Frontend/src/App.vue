<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import StickyNav from '@/components/layout/StickyNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
import WhatsAppButton from '@/components/common/WhatsAppButton.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <StickyNav />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
    <ScrollToTop />
    <WhatsAppButton />
  </div>
</template>
