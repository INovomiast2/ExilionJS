import { Logger } from '../utils/Logger';
import { EventEmitter } from 'events';

type TranslationValue = string | string[];
type Translations = Record<string, Record<string, TranslationValue>>;

class I18n extends EventEmitter {
  private static instance: I18n;
  private translations: Translations = {};
  private currentLocale: string = 'es';

  private constructor() {
    super();
  }

  static getInstance(): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n();
    }
    return I18n.instance;
  }

  setLocale(locale: string): void {
    this.currentLocale = locale;
    Logger.info(`Idioma cambiado a: ${locale}`);
    this.emit('localeChanged', locale);
  }

  addTranslations(locale: string, translations: Record<string, TranslationValue>): void {
    this.translations[locale] = {
      ...this.translations[locale],
      ...translations
    };
    Logger.info(`Traducciones añadidas para: ${locale}`);
  }

  t(key: string, params: Record<string, string> = {}): string | string[] {
    const value = this.translations[this.currentLocale]?.[key];
    
    if (Array.isArray(value)) {
      return value.map(item => this.replaceParams(item, params));
    }

    if (typeof value !== 'string') {
      return key; // Fallback to key if translation is not found
    }

    return this.replaceParams(value, params);
  }

  private replaceParams(text: string, params: Record<string, string>): string {
    return Object.entries(params).reduce((acc, [param, paramValue]) => {
      return acc.replace(`{${param}}`, paramValue);
    }, text);
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  getAvailableLocales(): string[] {
    return Object.keys(this.translations);
  }
}

export default I18n.getInstance();
