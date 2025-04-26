// src/design-tokens.ts
export const colors = {
    primary: '#2e3192',
    primaryLight: '#585bca',
    primaryDark: '#1d2061',
    accent1: '#ff6b35',
    accent2: '#00c4ff',
    neutralBg: '#f5f7fc',
    neutralText: '#1a1c2c',
  } as const;
  
  export const font = {
    family: {
      sans: '"Inter", system-ui, sans-serif',
      display: '"Lexend", system-ui, sans-serif',
    },
    size: {
      h1: '3.052rem',
      h2: '2.441rem',
      h3: '1.953rem',
      h4: '1.563rem',
      h5: '1.25rem',
      bodyLg: '1.125rem',
      body: '1rem',
      bodySm: '0.875rem',
      caption: '0.75rem',
    },
    line: {
      tight: 1.1,
      snug: 1.2,
      normal: 1.6,
    },
  } as const;
  
  export const radius = {
    sm: '4px',
    md: '8px',
    lg: '16px',
    pill: '9999px',
  } as const;
  
  export const shadow = {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 8px 16px rgba(0,0,0,0.12)',
  } as const;