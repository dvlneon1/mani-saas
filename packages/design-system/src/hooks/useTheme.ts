import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Hook to manage theme mode (light/dark/system)
 * Returns current color scheme and toggle function
 */
export function useTheme() {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  const colorScheme =
    themeMode === 'system'
      ? systemColorScheme ?? 'light'
      : themeMode;

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  return {
    colorScheme,
    themeMode,
    toggleTheme,
    setTheme,
  };
}
