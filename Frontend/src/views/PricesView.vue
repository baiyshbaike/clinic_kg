<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { priceCategories } from '@/data/prices'
import type { PriceCategory, PriceService } from '@/data/prices'

const { t } = useI18n()
const searchQuery = ref('')

const formatPrice = (price: PriceService['price']) => {
  return typeof price === 'number' ? `${price} сом` : price
}

const categoryMatches = (category: PriceCategory, query: string) => {
  if (!query) return true
  const normalized = query.toLowerCase()
  const directServices = category.services || []
  const nestedServices = category.subcategories?.flatMap((subcategory) => subcategory.services) || []

  return Boolean(
    category.category.toLowerCase().includes(normalized) ||
    directServices.some((service) => service.name.toLowerCase().includes(normalized)) ||
    nestedServices.some((service) => service.name.toLowerCase().includes(normalized)) ||
    category.subcategories?.some((subcategory) => subcategory.subcategory.toLowerCase().includes(normalized)),
  )
}

const filteredCategories = computed(() =>
  priceCategories.filter((category) => categoryMatches(category, searchQuery.value.trim())),
)
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('prices.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">{{ t('prices.subtitle') }}</p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="max-w-lg">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('prices.searchPlaceholder')"
            class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-7xl mx-auto space-y-4">
          <details
            v-for="(category, index) in filteredCategories"
            :key="category.category"
            :open="index < 2 || Boolean(searchQuery)"
            class="rounded-2xl border-2 border-border overflow-hidden bg-white card-shadow"
          >
            <summary class="cursor-pointer select-none px-6 py-4 bg-muted/30 hover:bg-muted/50 text-xl text-secondary font-semibold">
              {{ category.category }}
            </summary>

            <div v-if="category.subcategories" class="divide-y divide-border">
              <div v-for="subcategory in category.subcategories" :key="subcategory.subcategory">
                <div class="px-4 py-3 font-semibold text-secondary bg-muted/10">
                  {{ subcategory.subcategory }}
                </div>
                <div class="divide-y divide-border">
                  <div
                    v-for="service in subcategory.services"
                    :key="`${subcategory.subcategory}-${service.name}`"
                    class="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 hover:bg-muted/20"
                  >
                    <span class="text-sm text-foreground">{{ service.name }}</span>
                    <span class="text-sm text-primary font-semibold text-right whitespace-nowrap">{{ formatPrice(service.price) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="divide-y divide-border">
              <div
                v-for="service in category.services || []"
                :key="service.name"
                class="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 hover:bg-muted/20"
              >
                <span class="text-sm text-foreground">{{ service.name }}</span>
                <span class="text-sm text-primary font-semibold text-right whitespace-nowrap">{{ formatPrice(service.price) }}</span>
              </div>
            </div>
          </details>

          <div v-if="filteredCategories.length === 0" class="text-center py-12">
            <p class="text-muted-foreground text-lg">{{ t('prices.notFound') }}</p>
          </div>

          <div class="rounded-2xl border-l-4 border-l-primary bg-muted/20 p-6">
            <p class="text-muted-foreground text-sm">
              <strong class="text-foreground">{{ t('prices.noteTitle') }}:</strong>
              {{ t('prices.note') }}
              <a href="tel:+996312663549" class="text-primary hover:underline font-semibold">+996 (312) 66-35-49</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
