import { BlocksTokens } from 'lib/css/theme/tokenType';

export const tokens: BlocksTokens = {
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
    secondaryLight: '#7265E3',
    secondary: '#7FE3F0',
    secondaryDark: '#4D3CAB',
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
    boxShadow: '0 0 4px 2px #AF8EFF',
  },
  space: {
    none: '0px',
    gutter: '28px',
    xsmall: '4px',
    small: '8px',
    medium: '12px',
    large: '16px',
    xlarge: '24px',
  },
  transition: {
    slow: '0.5s',
    normal: '0.3s',
    fast: '0.1s',
  },
  typography: {
    fontFamily: {
      standard: '"Rubik", sans-serif',
      secondary: '"Rubik", sans-serif',
    },
    fontSize: {
      xsmall: '12px',
      small: '14px',
      medium: '16px',
      large: '20px',
      xlarge: '24px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      strong: 700,
    },
    lineHeight: {
      xsmall: '1rem',
      small: '1.25rem',
      medium: '1.5rem',
      large: '1.75rem',
      xlarge: '2rem',
    },
  },
};
