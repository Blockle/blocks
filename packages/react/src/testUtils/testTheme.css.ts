import { makeTheme } from '@blockle/blocks-core';

const colorPalette = {
  100: '#f7fafc',
  200: '#edf2f7',
  300: '#e2e8f0',
  400: '#cbd5e0',
  500: '#a0aec0',
  600: '#718096',
  700: '#4a5568',
  800: '#2d3748',
  900: '#1a202c',
};

export const testingTheme = makeTheme({
  name: 'testing',
  components: {},
  tokens: {
    border: {
      radius: { 1: '4px', 2: '8px', 3: '12px', 4: '16px' },
      width: { thin: '1px', thick: '2px' },
    },
    color: {
      black: '#000000',
      white: '#FFFFFF',
      primary: colorPalette,
      secondary: colorPalette,
      success: colorPalette,
      warning: colorPalette,
      danger: colorPalette,
      info: colorPalette,
      text: colorPalette,
      background: colorPalette,
    },
    focus: {
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    },
    shadow: {
      small: '0 1px 2px rgba(0, 0, 0, 0.05)',
      medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
      large: '0 10px 15px rgba(0, 0, 0, 0.15)',
    },
    spacing: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
      7: '48px',
      8: '64px',
    },
    typography: {
      fontFamily: {
        body: 'Arial, sans-serif',
        primary: 'Arial, sans-serif',
        secondary: 'Georgia, serif',
      },
      fontSize: {
        xsmall: '12px',
        small: '14px',
        medium: '16px',
        large: '20px',
        xlarge: '24px',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        strong: 700,
        bold: 800,
      },
      lineHeight: {
        xsmall: '16px',
        small: '20px',
        medium: '24px',
        large: '28px',
        xlarge: '32px',
      },
    },
    transition: {
      slow: 'all 0.3s ease-in-out',
      normal: 'all 0.2s ease-in-out',
      fast: 'all 0.1s ease-in-out',
    },
  },
});
