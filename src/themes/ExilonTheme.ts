export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    body: string;
    heading: string;
  };
  spacing: Record<string, string>;
}

export class ThemeProvider {
  private static theme: Theme;

  static setTheme(theme: Theme) {
    this.theme = theme;
    this.applyTheme();
  }

  private static applyTheme() {
    const root = document.documentElement;
    Object.entries(this.theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }
}
