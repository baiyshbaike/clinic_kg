<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { news } from '@/data/news'

const { t } = useI18n()
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => {
  const cats = [...new Set(news.map(n => n.category))]
  return ['all', ...cats]
})

const filteredNews = computed(() => {
  return news.filter((item: any) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const getCategoryLabel = (cat: string) => {
  if (cat === 'all') return t('news.categories.all')
  if (cat === 'technology') return t('news.categories.technology')
  if (cat === 'event') return t('news.categories.event')
  if (cat === 'renovation') return t('news.categories.renovation')
  if (cat === 'education') return t('news.categories.education')
  return cat
}
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('news.title') }}</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          {{ t('news.allNews') }}
        </p>
      </div>
    </div>

    <section class="py-8 bg-background border-b border-border">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('news.searchPlaceholder')"
              class="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="[
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              ]"
            >
              {{ getCategoryLabel(cat) }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="(item, index) in filteredNews"
            :key="item.id"
            :to="`/news/${item.id}`"
            class="group rounded-2xl bg-white border-2 border-transparent hover:border-primary overflow-hidden card-shadow card-hover no-underline"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-white text-6xl font-bold group-hover:scale-110 transition-transform duration-300"
                :class="[
                  index % 3 === 0 ? 'gradient-primary' :
                  index % 3 === 1 ? 'gradient-secondary' :
                  'bg-accent'
                ]"
              >
                {{ index + 1 }}
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                  <line x1="16" x2="16" y1="2" y2="6"/>
                  <line x1="8" x2="8" y1="2" y2="6"/>
                  <line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
                <span>{{ item.date }}</span>
                <span class="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {{ getCategoryLabel(item.category) }}
                </span>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-muted-foreground text-sm mb-4 line-clamp-3">
                {{ item.excerpt }}
              </p>
              <div class="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                <span>{{ t('news.readMore') }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </div>
          </RouterLink>
        </div>

        <div v-if="filteredNews.length === 0" class="text-center py-12">
          <p class="text-muted-foreground text-lg">{{ t('news.notFound') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
