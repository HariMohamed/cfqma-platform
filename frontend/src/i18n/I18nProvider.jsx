import { createContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

export const I18nContext = createContext(null);

const STORAGE_KEY = 'cfqma-language';
const DEFAULT_LANGUAGE = 'fr';
const SUPPORTED_LANGUAGES = ['fr', 'ar', 'en'];

function getInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
}

function getNestedValue(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = (nextLanguage) => {
    const normalized = SUPPORTED_LANGUAGES.includes(nextLanguage) ? nextLanguage : DEFAULT_LANGUAGE;
    setLanguageState(normalized);
    localStorage.setItem(STORAGE_KEY, normalized);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => {
    const t = (path) => getNestedValue(translations[language], path) ?? getNestedValue(translations.fr, path) ?? path;
    return {
      language,
      isRtl: language === 'ar',
      setLanguage,
      t
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
