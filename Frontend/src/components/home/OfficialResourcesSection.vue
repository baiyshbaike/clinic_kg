<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { officialResources } from '@/data/officialResources'

const { t } = useI18n()
</script>

<template>
  <section class="py-16 bg-background">
    <div class="container-custom">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          {{ t('officialResources.title') }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <a
            v-for="resource in officialResources"
            :key="resource.id"
            :href="resource.url"
            :target="resource.isExternal ? '_blank' : '_self'"
            :rel="resource.isExternal ? 'noopener noreferrer' : ''"
            class="block group"
            :title="resource.title"
          >
            <div class="rounded-lg border-2 border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg relative">
              <div class="relative w-full h-auto bg-gradient-to-br from-slate-50 to-slate-100">
                <img
                  :src="resource.image"
                  :alt="resource.title"
                  class="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 min-h-[120px] max-h-[180px]"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/5"></div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
