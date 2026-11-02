import tokens from '../../tokens.json';

export type ColorScheme = 'light' | 'dark';

export interface DesignTokens {
  colors: typeof tokens.colors;
  typography: typeof tokens.typography;
  spacing: typeof tokens.spacing;
  borderRadius: typeof tokens.borderRadius;
  shadows: typeof tokens.shadows;
  touchTargets: typeof tokens.touchTargets;
}

/**
 * Hook to access design tokens with type safety
 */
export function useTokens(colorScheme: ColorScheme = 'light') {
  return {
    colors: tokens.colors[colorScheme],
    typography: tokens.typography,
    spacing: tokens.spacing,
    borderRadius: tokens.borderRadius,
    shadows: tokens.shadows,
    touchTargets: tokens.touchTargets,
  };
}

export { tokens };
