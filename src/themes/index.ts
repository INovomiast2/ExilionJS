import { Logger } from '../utils/Logger';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  linkColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

class ThemeManager {
  private themes: Record<string, Theme>;
  private currentTheme: Theme | null;

  constructor() {
    this.themes = {};
    this.currentTheme = null;
    this.initializeDefaultThemes();
  }

  private initializeDefaultThemes(): void {
    this.addTheme('light', {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      headingColor: '#111827',
      linkColor: '#2563EB',
      buttonColor: '#3B82F6',
      buttonTextColor: '#FFFFFF'
    });

    this.addTheme('dark', {
      primaryColor: '#60A5FA',
      secondaryColor: '#34D399',
      backgroundColor: '#1F2937',
      textColor: '#F3F4F6',
      headingColor: '#F9FAFB',
      linkColor: '#93C5FD',
      buttonColor: '#60A5FA',
      buttonTextColor: '#1F2937'
    });
  }

  addTheme(name: string, theme: Theme): void {
    this.themes[name] = theme;
    Logger.info(`Tema añadido: ${name}`);
  }

  setTheme(themeName: string): void {
    if (this.themes[themeName]) {
      this.currentTheme = this.themes[themeName];
      Logger.info(`Tema cambiado a: ${themeName}`);
      this.applyTheme();
    } else {
      Logger.error(`Tema no encontrado: ${themeName}`);
    }
  }

  getCurrentTheme(): Theme | null {
    return this.currentTheme;
  }

  private applyTheme(): void {
    if (!this.currentTheme) return;

    const root = document.documentElement;
    Object.entries(this.currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }

  getAllThemes(): string[] {
    return Object.keys(this.themes);
  }
}

export default new ThemeManager();
