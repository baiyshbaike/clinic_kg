import { createI18n } from 'vue-i18n'
import ru from '@/locales/ru.json'
import ky from '@/locales/ky.json'

// По умолчанию русский язык, если пользователь не выбрал другой
const getDefaultLocale = (): string => {
  const savedLocale = localStorage.getItem('clinic-language')
  if (savedLocale && ['ru', 'ky'].includes(savedLocale)) {
    return savedLocale
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
  },
})

export default i18n
