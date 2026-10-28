import { pixelsToRem, type ThemeTokens } from '@blockle/blocks-core';

const focusColor = '#7FE3F0';
const focusColorDark = '#A8EEF6';

export const tokens: ThemeTokens = {
  border: {
    radius: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
    },
    width: {
      thin: '1px',
      thick: '2px',
    },
  },
  color: {
    white: '#fff',
    black: '#000',
    primary: {
      '100': '#E4DFFF',
      '200': '#C6B7FF',
      '300': '#A488FF',
      '400': '#8660FF',
      '500': '#7265E3',
      '600': '#5E4DBA',
      '700': '#4D3CAB',
      '800': '#3B2A82',
      '900': '#2A1B5A',
    },
    // Intentional multihue sequence; indices are not a strict lightness ramp.
    secondary: {
      '100': '#DFFAF9',
      '200': '#B3F1EE',
      '300': '#7CF5CD',
      '400': '#4CE8BA',
      '500': '#7FE3F0',
      '600': '#68C6EF',
      '700': '#4DB8E8',
      '800': '#3399CC',
      '900': '#1A7FB3',
    },
    danger: {
      '100': '#FFE3E1',
      '200': '#FFBDB8',
      '300': '#FF9B90',
      '400': '#FF7A70',
      '500': '#FF5A52',
      '600': '#E03E39',
      '700': '#B32422',
      '800': '#80120F',
      '900': '#4D0A08',
    },
    info: {
      '100': '#E1F0FF',
      '200': '#B8DBFF',
      '300': '#90C4FF',
      '400': '#6CAEFF',
      '500': '#4D98FF',
      '600': '#337FEC',
      '700': '#1A66CC',
      '800': '#0D4D99',
      '900': '#053366',
    },
    success: {
      '100': '#E6F9F0',
      '200': '#B3F0D6',
      '300': '#7CE3BA',
      '400': '#4CE8A3',
      '500': '#1AD88C',
      '600': '#00B36A',
      '700': '#009354',
      '800': '#00773D',
      '900': '#005C29',
    },
    warning: {
      '100': '#FFF4E5',
      '200': '#FFE0B3',
      '300': '#FFCC80',
      '400': '#FFB84D',
      '500': '#FFA31A',
      '600': '#E08000',
      '700': '#B26600',
      '800': '#804D00',
      '900': '#4D3300',
    },
    neutral: {
      100: '#F7F7F7',
      200: '#E1E1E1',
      300: '#CFCFCF',
      400: '#B1B1B1',
      500: '#9E9E9E',
      600: '#7E7E7E',
      700: '#5E5E5E',
      800: '#3C3C3C',
      900: '#1A1A1A',
    },
  },
  // Dark values are a proposal, shown for review in the PR.
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
      sunken: { light: 'neutral-100', dark: '#0D0D0D' },
      inverse: { light: 'neutral-900', dark: 'neutral-100' },
    },
    border: {
      default: { light: 'neutral-200', dark: 'neutral-800' },
      strong: { light: 'neutral-400', dark: 'neutral-700' },
    },
    focusRing: {
      color: { light: focusColor, dark: focusColorDark },
      boxShadow: {
        light: `0 0 1px 2px ${focusColor}`,
        dark: `0 0 1px 2px ${focusColorDark}`,
      },
    },
    overlay: {
      default: { light: 'rgba(13, 13, 13, 0.4)', dark: 'rgba(0, 0, 0, 0.6)' },
    },
    shadow: {
      1: {
        light: '0px 4px 8px rgba(0, 0, 0, 0.08)',
        dark: '0px 4px 8px rgba(0, 0, 0, 0.4)',
      },
      2: {
        light: '0px 8px 16px rgba(0, 0, 0, 0.08)',
        dark: '0px 8px 16px rgba(0, 0, 0, 0.45)',
      },
      3: {
        light: '0px 16px 24px rgba(0, 0, 0, 0.08)',
        dark: '0px 16px 24px rgba(0, 0, 0, 0.5)',
      },
      4: {
        light: '0px 24px 32px rgba(0, 0, 0, 0.08)',
        dark: '0px 24px 32px rgba(0, 0, 0, 0.55)',
      },
      5: {
        light: '0px 32px 40px rgba(0, 0, 0, 0.08)',
        dark: '0px 32px 40px rgba(0, 0, 0, 0.6)',
      },
    },
    // --- End of neutral roles ---

    // --- Intent roles (T284) ---
    intentPrimary: {
      solid: { light: 'primary-600', dark: 'primary-300' },
      solidHover: { light: 'primary-700', dark: 'primary-400' },
      subtle: { light: 'primary-100', dark: 'primary-900' },
      contrast: { light: 'white', dark: 'neutral-900' },
      foreground: { light: 'primary-700', dark: 'primary-300' },
      border: { light: 'primary-300', dark: 'primary-700' },
    },
    intentSecondary: {
      solid: { light: 'secondary-500', dark: 'secondary-500' },
      solidHover: { light: 'secondary-600', dark: 'secondary-400' },
      subtle: { light: 'secondary-100', dark: '#0F3A4D' },
      contrast: { light: 'neutral-900', dark: 'neutral-900' },
      foreground: { light: '#126A94', dark: 'secondary-400' },
      border: { light: 'secondary-300', dark: 'secondary-800' },
    },
    intentNeutral: {
      solid: { light: 'neutral-800', dark: 'neutral-200' },
      solidHover: { light: 'neutral-900', dark: 'neutral-300' },
      subtle: { light: 'neutral-100', dark: 'neutral-800' },
      contrast: { light: 'white', dark: 'neutral-900' },
      foreground: { light: 'neutral-800', dark: 'neutral-300' },
      border: { light: 'neutral-300', dark: 'neutral-700' },
    },
    intentDanger: {
      solid: { light: 'danger-700', dark: 'danger-400' },
      solidHover: { light: 'danger-800', dark: 'danger-300' },
      subtle: { light: 'danger-100', dark: 'danger-900' },
      contrast: { light: 'white', dark: 'neutral-900' },
      foreground: { light: 'danger-700', dark: 'danger-300' },
      border: { light: 'danger-300', dark: 'danger-700' },
    },
    intentSuccess: {
      solid: { light: 'success-800', dark: 'success-500' },
      solidHover: { light: 'success-900', dark: 'success-400' },
      subtle: { light: 'success-100', dark: 'success-900' },
      contrast: { light: 'white', dark: 'neutral-900' },
      foreground: { light: 'success-800', dark: 'success-400' },
      border: { light: 'success-300', dark: 'success-700' },
    },
    intentInfo: {
      solid: { light: 'info-700', dark: 'info-400' },
      solidHover: { light: 'info-800', dark: 'info-300' },
      subtle: { light: 'info-100', dark: 'info-900' },
      contrast: { light: 'white', dark: 'neutral-900' },
      foreground: { light: 'info-700', dark: 'info-300' },
      border: { light: 'info-300', dark: 'info-700' },
    },
    intentWarning: {
      solid: { light: 'warning-500', dark: 'warning-500' },
      solidHover: { light: 'warning-600', dark: 'warning-400' },
      subtle: { light: 'warning-100', dark: 'warning-900' },
      contrast: { light: 'neutral-900', dark: 'neutral-900' },
      foreground: { light: 'warning-800', dark: 'warning-400' },
      border: { light: 'warning-300', dark: 'warning-700' },
    },
    // --- end Intent roles ---
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
  transition: {
    slow: '240ms',
    normal: '120ms',
    fast: '80ms',
  },
  typography: {
    fontFamily: {
      body: '"Rubik", sans-serif',
      heading: '"Rubik", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xsmall: pixelsToRem(12),
      small: pixelsToRem(14),
      medium: pixelsToRem(16),
      large: pixelsToRem(20),
      xlarge: pixelsToRem(24),
      display: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
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
};
