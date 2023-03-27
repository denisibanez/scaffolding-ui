import { createI18n } from 'vue-i18n';
import en from './en/en.json';
import pt from './pt/pt-BR.json';

// LOCALES
export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages: {
    en: en,
    'pt-BR': pt,
  },
});
