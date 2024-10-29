'use client';

import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import en from '@/i18n/locales/en';
import es from '@/i18n/locales/es';

type Locale = 'en' | 'es';
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, es };

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  changeLocale: (newLocale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  t: (key: string) => key,
  changeLocale: () => {},
});

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // Detectar idioma del navegador o recuperar de localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    const browserLang = navigator.language.split('-')[0] as Locale;
    const initialLocale = savedLocale || (translations[browserLang] ? browserLang : 'en');
    setLocale(initialLocale);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }

    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    return value;
  }, [locale]);

  const changeLocale = useCallback((newLocale: Locale) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  const contextValue = {
    locale,
    t,
    changeLocale
  };

  return React.createElement(I18nContext.Provider, { value: contextValue }, children);
}

export const useI18n = () => useContext(I18nContext);