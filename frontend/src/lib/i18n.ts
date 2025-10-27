import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

const getStoredLanguage = (): string => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('config-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.state?.language || 'en';
      }
    } catch {
      return 'en';
    }
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    ar: {
      translation: arTranslations,
    },
  },
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
