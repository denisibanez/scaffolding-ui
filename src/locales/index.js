import { createI18n } from 'vue-i18n';
/* eslint @intlify/vue-i18n/no-missing-keys: 'error' */

import en from './en/en.json';
import pt from './pt/pt-BR.json';

// LOCALES
export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'pt',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  fallbackWarn: false,
  missingWarn: false,
  messages: {
    en: en,
    pt: pt,
  },
});
