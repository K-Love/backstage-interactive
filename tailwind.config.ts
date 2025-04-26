import { colors, font } from './src/design-tokens';

export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        'primary-light': colors.primaryLight,
        'primary-dark': colors.primaryDark,
        accent1: colors.accent1,
        accent2: colors.accent2,
        'neutral-bg': colors.neutralBg,
        'neutral-text': colors.neutralText,
      },
      fontFamily: {
        sans: [font.family.sans],
        display: [font.family.display],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        pill: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 8px 16px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};