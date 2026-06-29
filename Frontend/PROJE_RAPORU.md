# Клиника KG Frontend - Отчет по проекту

## 📋 Обзор проекта

| Параметр | Значение |
|----------|----------|
| **Фреймворк** | Vue 3 + TypeScript + Vite |
| **CSS** | Tailwind CSS v4 |
| **Языковая поддержка** | Русский, Кыргызский, Английский (vue-i18n) |
| **Всего страниц** | 15 (1 пустая, 1 в ожидании) |
| **Компонентов** | 16 (3 layout + 8 home + 5 common) |
| **Файлов данных** | 9 (статические данные) |

---

## 🏠 Структура страниц

### Главная (`/`)
HeroSlider, QuickAccess, Structure, Services, Advantages, News, OfficialResources, PatientInfo

### О нас (`/about`)
Сетка услуг, итоговое сообщение, преимущества

### Руководство (`/management`)
Ожидание - данные будут получены из Contentful

### Цены (`/prices`)
Строка поиска, раскрывающиеся категории, стоимость услуг

### Галерея (`/gallery`)
Фильтр по категориям, сетка изображений, лайтбокс

### Реконструкция (`/renovations`)
Сравнение до/после, модальное окно галереи

### Поликлиника (`/polyclinic`)
Статистика, сетка отделений, услуги + руководитель

### Больница (`/hospital`)
Статистика, отделения, условия + правила госпитализации

### ОГПМУ (`/ogpmu`)
Структура, руководитель + специалисты, преимущества, услуги, контакты

### Информация (`/information`)
Информационные карточки, FAQ, права пациентов

### Вакансии (`/vacancies`)
Строка поиска, сетка вакансий, кнопка подачи заявки

### Новости (`/news`)
Поиск + фильтр по категориям, сетка новостей

### Детали новости (`/news/:id`)
Содержимое новости, кнопки поделиться, похожие новости

### Контакты (`/contacts`)
Контактная информация + форма, карта

### 404 (`/*`)
Анимированная страница ошибки

---

## 🧩 Структура компонентов

```
App.vue
├── AppHeader (градиентная шапка, логотип, телефон, соцсети, язык)
├── StickyNav (прилипающая навигация, scroll > 150px)
├── <RouterView />
├── AppFooter (3 колонки: контакты, режим работы, быстрые ссылки)
├── ScrollToTop (scroll > 300px)
└── WhatsAppButton (scroll > 300px)
```

---

## 📊 Источники данных

| Файл | Содержимое |
|------|------------|
| `clinicStructure.ts` | Данные поликлиники, больницы, ОГПМУ |
| `doctors.ts` | Список врачей |
| `gallery.ts` | Категории и изображения галереи |
| `information.ts | Информационные карточки, FAQ, права пациентов |
| `news.ts` | Список новостей |
| `prices.ts` | Категории цен |
| `renovations.ts` | Разделы реконструкции |
| `services.ts` | Список услуг |
| `vacancies.ts` | Список вакансий |

---

## 🔧 Технические особенности

- **Lazy Loading**: Все страницы загружаются через `() => import(...)`
- **Scroll Behavior**: `savedPosition` или `top: 0`
- **Обновление заголовка**: Хук `beforeEach` обновляет заголовок каждой страницы
- **Адаптивность**: Брейкпоинты `md:`, `lg:` для мобильных устройств
- **Hover-эффекты**: `hover:border-primary hover:shadow-lg transition-all duration-300`
- **Градиентная шапка**: На всех страницах `gradient-secondary text-white py-16`

---

## 📁 Пути к файлам

```
src/
├── App.vue
├── router/index.ts
├── views/ (15 страниц)
├── components/
│   ├── layout/ (3: AppHeader, AppFooter, StickyNav)
│   ├── home/ (8: HeroSlider, QuickAccess, Structure, Services, Advantages, News, OfficialResources, PatientInfo)
│   └── common/ (5: LanguageSwitcher, WhatsAppButton, ScrollToTop, LazyImage, SkeletonLoader)
├── data/ (9 файлов данных)
├── locales/ (3 языка: ru.json, ky.json, en.json)
└── composables/ (3: usePhoneMask, useFormValidation, useSeo)
```

---

*Дата отчета: 29 июня 2026*
