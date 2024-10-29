import React from 'react';
import { RouterProvider } from '@/router/RouterContext';
import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from '@/hooks/useI18n';

export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <RouterProvider>
          {/* El contenido se renderiza automáticamente por el RouterProvider */}
        </RouterProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
