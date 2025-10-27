import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import i18n from '@/lib/i18n';

type Theme = 'light' | 'dark';
type Language = 'en' | 'ar';

interface ConfigStore {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}

// Initialize theme immediately on module load
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('config-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        const theme = (parsed?.state?.theme as Theme) || 'light';
        document.documentElement.classList.toggle('dark', theme === 'dark');
        return theme;
      }
    } catch {
      console.error('Could not parse theme from localStorage');
      return 'light';
    }
  }
  document.documentElement.classList.remove('dark');
  return 'light';
};

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('config-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        return (parsed?.state?.language as Language) || 'en';
      }
    } catch {
      return 'en';
    }
  }
  return 'en';
};

const initialTheme = getInitialTheme();
const initialLanguage = getInitialLanguage();

const useConfigStore = create<ConfigStore>()(
  persist(
    set => ({
      theme: initialTheme,
      language: initialLanguage,
      toggleTheme: () =>
        set(state => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          return { theme: newTheme };
        }),
      setTheme: theme => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },
      setLanguage: language => {
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', language);
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'config-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Initialize language on module load
if (typeof window !== 'undefined') {
  document.documentElement.setAttribute('dir', initialLanguage === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', initialLanguage);
  i18n.changeLanguage(initialLanguage);
}

export default useConfigStore;
