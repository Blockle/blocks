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
  components: {
    alert: { root: '' },
    button: { root: '' },
    checkbox: { root: '', icon: '', label: '' },
    dialog: { dialog: '' },
    divider: { root: '' },
    heading: { root: '' },
    icon: { root: '' },
    label: { root: '' },
    link: { root: '' },
    popover: { root: '' },
    progress: { bar: '', root: '' },
    radio: { root: '', icon: '', label: '' },
    select: { icon: '', select: '' },
    slider: { root: '', thumb: '', track: '', filledTrack: '' },
    spinner: { root: '' },
    switch: { root: '', thumb: '' },
    text: { root: '' },
    textarea: { root: '', input: '' },
    textInput: { root: '', input: '' },
    toast: { root: '' },
    tooltip: { root: '' },
  },
  tokens: {
    border: {
      radius: { 1: '4px', 2: '8px', 3: '12px', 4: '16px' },
      width: { thin: '1px', thick: '2px' },
    },
    color: {
      black: '#000000',
      white: '#FFFFFF',
      border: '#E1E1E1',
      focus: '#7FE3F0',
      primary: colorPalette,
      secondary: colorPalette,
      success: colorPalette,
      warning: colorPalette,
      danger: colorPalette,
      info: colorPalette,
      text: colorPalette,
      background: colorPalette,
      neutral: colorPalette,
    },
    colorRoles: {
      text: {
        default: { light: 'neutral-900', dark: 'neutral-100' },
        muted: { light: 'neutral-700', dark: 'neutral-400' },
        disabled: { light: 'neutral-400', dark: 'neutral-600' },
        inverse: { light: 'white', dark: 'neutral-900' },
      },

      // --- Neutral roles, shadows and focus ring (T283) ---
      surface: {
        default: { light: 'white', dark: 'neutral-900' },
        raised: { light: 'white', dark: 'neutral-800' },
        sunken: { light: 'neutral-100', dark: 'black' },
        inverse: { light: 'neutral-900', dark: 'neutral-100' },
      },
      border: {
        default: { light: 'neutral-300', dark: 'neutral-800' },
        strong: { light: 'neutral-500', dark: 'neutral-700' },
      },
      focusRing: {
        color: { light: '#4299e1', dark: '#90cdf4' },
        boxShadow: {
          light: '0 0 0 3px rgba(66, 153, 225, 0.6)',
          dark: '0 0 0 3px rgba(144, 205, 244, 0.6)',
        },
      },
      overlay: {
        default: { light: 'rgba(0, 0, 0, 0.4)', dark: 'rgba(0, 0, 0, 0.6)' },
      },
      shadow: {
        1: {
          light: '0 1px 2px rgba(0, 0, 0, 0.05)',
          dark: '0 1px 2px rgba(0, 0, 0, 0.4)',
        },
        2: {
          light: '0 4px 6px rgba(0, 0, 0, 0.1)',
          dark: '0 4px 6px rgba(0, 0, 0, 0.45)',
        },
        3: {
          light: '0 10px 15px rgba(0, 0, 0, 0.15)',
          dark: '0 10px 15px rgba(0, 0, 0, 0.5)',
        },
        4: {
          light: '0 16px 24px rgba(0, 0, 0, 0.08)',
          dark: '0 16px 24px rgba(0, 0, 0, 0.5)',
        },
        5: {
          light: '0 24px 32px rgba(0, 0, 0, 0.08)',
          dark: '0 24px 32px rgba(0, 0, 0, 0.55)',
        },
      },
      // --- End of neutral roles ---
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
        heading: 'Arial, sans-serif',
        mono: 'Georgia, serif',
      },
      fontSize: {
        xsmall: '12px',
        small: '14px',
        medium: '16px',
        large: '20px',
        xlarge: '24px',
        display: 'clamp(32px, 24px + 2.5vw, 56px)',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        strong: 700,
        bold: 800,
      },
      lineHeight: {
        compact: 1.1,
        snug: 1.3,
        normal: 1.5,
        relaxed: 1.7,
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0',
        wide: '0.05em',
        wider: '0.1em',
      },
    },
    transition: {
      slow: 'all 0.3s ease-in-out',
      normal: 'all 0.2s ease-in-out',
      fast: 'all 0.1s ease-in-out',
    },
  },
});
