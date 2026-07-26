// vue-i18n 9 (Vue 3). Vuetify 3 manages its own locale, so no $vuetify block here.
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'

export default createI18n({
  legacy: true,
  locale: import.meta.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: { en },
})
