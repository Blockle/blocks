import { rem } from '../../lib/css/utils/cssUtils';
import { ThemeTokens } from '../../lib/theme/tokensType';

export const tokens: ThemeTokens = {
  border: {
    radius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      xlarge: '32px',
    },
    width: {
      small: '1px',
      medium: '2px',
      large: '4px',
    },
  },
  color: {
    white: '#fff',
    black: '#000',
    body: '#F4F6FA',
    primaryLight: '#E4DFFF',
    primary: '#7265E3',
    primaryDark: '#4D3CAB',
    secondaryLight: '#7CF5CD',
    secondary: '#7FE3F0',
    secondaryDark: '#68C6EF',
    text: '#2D3142',
    textLight: '#9C9EB9',
    textDark: '#4C5980',
    danger: '#FF9B90',
    link: '#7265E3',
  },
  shadow: {
    small: '0px 4px 8px rgba(0, 0, 0, 0.08)',
    medium: '0px 8px 16px rgba(0, 0, 0, 0.08)',
    large: '0px 16px 24px rgba(0, 0, 0, 0.08)',
  },
  focus: {
    boxShadow: '0 0 1px 2px #AF8EFF',
  },
  spacing: {
    none: '0px',
    gutter: '28px',
    xsmall: '4px',
    small: '8px',
    medium: '12px',
    large: '16px',
    xlarge: '24px',
  },
  transition: {
    slow: '240ms',
    normal: '120ms',
    fast: '80ms',
  },
  typography: {
    fontFamily: {
      body: '"Rubik", sans-serif',
      primary: '"Rubik", sans-serif',
      secondary: '"Rubik", sans-serif',
    },
    fontSize: {
      xsmall: rem(12),
      small: rem(14),
      medium: rem(16),
      large: rem(20),
      xlarge: rem(24),
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      strong: 700,
    },
    lineHeight: {
      xsmall: rem(16),
      small: rem(20),
      medium: rem(24),
      large: rem(28),
      xlarge: rem(32),
    },
  },
};
