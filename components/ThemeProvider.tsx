'use client';

import * as React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  attribute?: 'class' | 'data-theme';
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  attribute = 'class',
}: ThemeProviderProps) {
  // При первой загрузке синхронизируем тему с локальным хранилищем или значением по умолчанию
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    const root = window.document.documentElement;

    if (attribute === 'class') {
      root.classList.remove('light', 'dark');
      root.classList.add(savedTheme);
    } else {
      root.setAttribute(attribute, savedTheme);
    }
  }, [defaultTheme, attribute]);

  return <>{children}</>;
}
