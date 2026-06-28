<script setup lang="ts">
defineProps<{
  type?: 'text' | 'card' | 'avatar' | 'image' | 'button'
  count?: number
  lines?: number
}>()
</script>

<template>
  <div class="animate-pulse">
    <!-- Text Skeleton -->
    <template v-if="type === 'text'">
      <div v-for="i in (lines || 3)" :key="i" class="space-y-2">
        <div class="h-4 bg-muted rounded w-full" :class="{ 'w-3/4': i === lines }" />
      </div>
    </template>

    <!-- Card Skeleton -->
    <template v-else-if="type === 'card'">
      <div v-for="i in (count || 1)" :key="i" class="rounded-2xl border border-border overflow-hidden">
        <div class="h-48 bg-muted" />
        <div class="p-6 space-y-3">
          <div class="h-5 bg-muted rounded w-3/4" />
          <div class="h-4 bg-muted rounded w-full" />
          <div class="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    </template>

    <!-- Avatar Skeleton -->
    <template v-else-if="type === 'avatar'">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-muted flex-shrink-0" />
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-muted rounded w-1/2" />
          <div class="h-3 bg-muted rounded w-1/3" />
        </div>
      </div>
    </template>

    <!-- Image Skeleton -->
    <template v-else-if="type === 'image'">
      <div class="rounded-2xl bg-muted aspect-video" />
    </template>

    <!-- Button Skeleton -->
    <template v-else-if="type === 'button'">
      <div class="h-10 bg-muted rounded-xl w-32" />
    </template>

    <!-- Default: Block -->
    <template v-else>
      <div class="space-y-3">
        <div class="h-4 bg-muted rounded w-full" />
        <div class="h-4 bg-muted rounded w-5/6" />
        <div class="h-4 bg-muted rounded w-4/6" />
      </div>
    </template>
  </div>
</template>
