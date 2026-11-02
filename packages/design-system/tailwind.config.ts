import type { Config } from 'tailwindcss';
import tokens from './tokens.json';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../apps/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens for light mode
        primary: {
          DEFAULT: tokens.colors.light.primary,
          hover: tokens.colors.light.primaryHover,
        },
        secondary: {
          DEFAULT: tokens.colors.light.secondary,
          hover: tokens.colors.light.secondaryHover,
        },
        accent: {
          DEFAULT: tokens.colors.light.accent,
          foreground: tokens.colors.light.accentForeground,
        },
        success: {
          DEFAULT: tokens.colors.light.success,
          foreground: tokens.colors.light.successForeground,
        },
        warning: {
          DEFAULT: tokens.colors.light.warning,
          foreground: tokens.colors.light.warningForeground,
        },
        destructive: {
          DEFAULT: tokens.colors.light.destructive,
          foreground: tokens.colors.light.destructiveForeground,
        },
        background: tokens.colors.light.background,
        surface: {
          DEFAULT: tokens.colors.light.surface,
          elevated: tokens.colors.light.surfaceElevated,
        },
        border: {
          DEFAULT: tokens.colors.light.border,
          hover: tokens.colors.light.borderHover,
        },
        text: {
          primary: tokens.colors.light.textPrimary,
          secondary: tokens.colors.light.textSecondary,
          muted: tokens.colors.light.textMuted,
          inverse: tokens.colors.light.textInverse,
        },
      },
      fontFamily: {
        sans: [tokens.typography.fontFamily, tokens.typography.fontFamilyFallback],
      },
      fontSize: {
        'display-lg': [`${tokens.typography.displayLarge.fontSize}px`, { lineHeight: `${tokens.typography.displayLarge.lineHeight}px`, letterSpacing: `${tokens.typography.displayLarge.letterSpacing}px`, fontWeight: tokens.typography.displayLarge.fontWeight }],
        'display-md': [`${tokens.typography.displayMedium.fontSize}px`, { lineHeight: `${tokens.typography.displayMedium.lineHeight}px`, letterSpacing: `${tokens.typography.displayMedium.letterSpacing}px`, fontWeight: tokens.typography.displayMedium.fontWeight }],
        'display-sm': [`${tokens.typography.displaySmall.fontSize}px`, { lineHeight: `${tokens.typography.displaySmall.lineHeight}px`, letterSpacing: `${tokens.typography.displaySmall.letterSpacing}px`, fontWeight: tokens.typography.displaySmall.fontWeight }],
        'headline-lg': [`${tokens.typography.headlineLarge.fontSize}px`, { lineHeight: `${tokens.typography.headlineLarge.lineHeight}px`, letterSpacing: `${tokens.typography.headlineLarge.letterSpacing}px`, fontWeight: tokens.typography.headlineLarge.fontWeight }],
        'headline-md': [`${tokens.typography.headlineMedium.fontSize}px`, { lineHeight: `${tokens.typography.headlineMedium.lineHeight}px`, letterSpacing: `${tokens.typography.headlineMedium.letterSpacing}px`, fontWeight: tokens.typography.headlineMedium.fontWeight }],
        'headline-sm': [`${tokens.typography.headlineSmall.fontSize}px`, { lineHeight: `${tokens.typography.headlineSmall.lineHeight}px`, letterSpacing: `${tokens.typography.headlineSmall.letterSpacing}px`, fontWeight: tokens.typography.headlineSmall.fontWeight }],
        'title-lg': [`${tokens.typography.titleLarge.fontSize}px`, { lineHeight: `${tokens.typography.titleLarge.lineHeight}px`, letterSpacing: `${tokens.typography.titleLarge.letterSpacing}px`, fontWeight: tokens.typography.titleLarge.fontWeight }],
        'title-md': [`${tokens.typography.titleMedium.fontSize}px`, { lineHeight: `${tokens.typography.titleMedium.lineHeight}px`, letterSpacing: `${tokens.typography.titleMedium.letterSpacing}px`, fontWeight: tokens.typography.titleMedium.fontWeight }],
        'title-sm': [`${tokens.typography.titleSmall.fontSize}px`, { lineHeight: `${tokens.typography.titleSmall.lineHeight}px`, letterSpacing: `${tokens.typography.titleSmall.letterSpacing}px`, fontWeight: tokens.typography.titleSmall.fontWeight }],
        'body-lg': [`${tokens.typography.bodyLarge.fontSize}px`, { lineHeight: `${tokens.typography.bodyLarge.lineHeight}px`, letterSpacing: `${tokens.typography.bodyLarge.letterSpacing}px`, fontWeight: tokens.typography.bodyLarge.fontWeight }],
        'body-md': [`${tokens.typography.bodyMedium.fontSize}px`, { lineHeight: `${tokens.typography.bodyMedium.lineHeight}px`, letterSpacing: `${tokens.typography.bodyMedium.letterSpacing}px`, fontWeight: tokens.typography.bodyMedium.fontWeight }],
        'body-sm': [`${tokens.typography.bodySmall.fontSize}px`, { lineHeight: `${tokens.typography.bodySmall.lineHeight}px`, letterSpacing: `${tokens.typography.bodySmall.letterSpacing}px`, fontWeight: tokens.typography.bodySmall.fontWeight }],
        'label-lg': [`${tokens.typography.labelLarge.fontSize}px`, { lineHeight: `${tokens.typography.labelLarge.lineHeight}px`, letterSpacing: `${tokens.typography.labelLarge.letterSpacing}px`, fontWeight: tokens.typography.labelLarge.fontWeight }],
        'label-sm': [`${tokens.typography.labelSmall.fontSize}px`, { lineHeight: `${tokens.typography.labelSmall.lineHeight}px`, letterSpacing: `${tokens.typography.labelSmall.letterSpacing}px`, fontWeight: tokens.typography.labelSmall.fontWeight }],
      },
      spacing: {
        '0': `${tokens.spacing[0]}px`,
        '1': `${tokens.spacing[1]}px`,
        '2': `${tokens.spacing[2]}px`,
        '3': `${tokens.spacing[3]}px`,
        '4': `${tokens.spacing[4]}px`,
        '5': `${tokens.spacing[5]}px`,
        '6': `${tokens.spacing[6]}px`,
        '8': `${tokens.spacing[8]}px`,
        '10': `${tokens.spacing[10]}px`,
        '12': `${tokens.spacing[12]}px`,
        '16': `${tokens.spacing[16]}px`,
      },
      borderRadius: {
        none: `${tokens.borderRadius.none}px`,
        sm: `${tokens.borderRadius.sm}px`,
        md: `${tokens.borderRadius.md}px`,
        lg: `${tokens.borderRadius.lg}px`,
        xl: `${tokens.borderRadius.xl}px`,
        '2xl': `${tokens.borderRadius['2xl']}px`,
        full: `${tokens.borderRadius.full}px`,
      },
      boxShadow: {
        none: tokens.shadows.none,
        xs: tokens.shadows.xs,
        sm: tokens.shadows.sm,
        md: tokens.shadows.md,
        lg: tokens.shadows.lg,
        xl: tokens.shadows.xl,
        '2xl': tokens.shadows['2xl'],
      },
    },
  },
  plugins: [],
};

export default config;
