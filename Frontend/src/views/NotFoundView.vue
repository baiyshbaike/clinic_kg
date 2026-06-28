<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="text-center px-4">
      <div class="relative mb-8">
        <h1 class="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none select-none">
          404
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <circle cx="12" cy="12" r="10"/>
              <path d="m15 9-6 6"/>
              <path d="m9 9 6 6"/>
            </svg>
          </div>
        </div>
      </div>

      <h2 class="text-2xl md:text-3xl font-bold text-foreground mb-4">
        {{ t('common.pageNotFound') }}
      </h2>
      <p class="text-muted-foreground mb-8 max-w-md mx-auto">
        {{ t('common.pageNotFound') }}. {{ t('common.goHome') }}.
      </p>

      <RouterLink
        to="/"
        class="btn-primary inline-flex items-center gap-2 no-underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        {{ t('common.goHome') }}
      </RouterLink>
    </div>
  </div>
</template>
