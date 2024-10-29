type Translations = Record<string, Record<string, string>>;

export class I18n {
  private static translations: Translations = {};
  private static currentLocale: string = 'es';

  static setLocale(locale: string) {
    this.currentLocale = locale;
  }

  static addTranslations(locale: string, translations: Record<string, string>) {
    this.translations[locale] = translations;
  }

  static t(key: string, params: Record<string, string> = {}) {
    let text = this.translations[this.currentLocale]?.[key] || key;
    
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });

    return text;
  }
}
