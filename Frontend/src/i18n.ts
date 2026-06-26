import { createI18n } from 'vue-i18n'
import ru from '@/locales/ru.json'
import ky from '@/locales/ky.json'
import en from '@/locales/en.json'

// Determine default language from browser or fallback to Russian
const getDefaultLocale = (): string => {
  const savedLocale = localStorage.getItem('clinic-language')
  if (savedLocale && ['ru', 'ky', 'en'].includes(savedLocale)) {
    return savedLocale
  }

  const browserLang = navigator.language.split('-')[0]
  if (['ru', 'ky', 'en'].includes(browserLang)) {
    return browserLang
  }

  return 'ru'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'ru',
  messages: {
    ru,
    ky,
    en,
  },
})

export default i18n
