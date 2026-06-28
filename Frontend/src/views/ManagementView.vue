<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <div class="gradient-secondary text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Руководство</h1>
        <p class="text-xl opacity-90 max-w-3xl">
          Информация о руководстве клинической больницы
        </p>
      </div>
    </div>

    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto rounded-2xl bg-white border-l-4 border-l-primary p-8 card-shadow">
          <h2 class="text-2xl font-bold text-secondary mb-4">Данные готовятся к публикации</h2>
          <p class="text-muted-foreground leading-relaxed mb-6">
            В старом проекте страница руководства получает актуальные данные из Contentful.
            Локального достоверного списка руководителей в репозитории нет, поэтому мы не переносим
            демонстрационные fallback-имена как реальные данные.
          </p>
          <p class="text-muted-foreground leading-relaxed mb-8">
            После получения утвержденного списка руководства его можно добавить в TS data и затем
            заменить на backend API без изменения структуры страницы.
          </p>
          <RouterLink to="/contacts" class="btn-primary inline-flex no-underline">
            Контакты
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
