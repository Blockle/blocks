import { BlocksTokens } from './tokenType';

export const tokens: BlocksTokens = {
  typography: {
    fontFamily: {
      standard: 'Roboto, sans-serif',
      secondary: 'Roboto, sans-serif',
    },
    fontSize: {
      xsmall: '0.75rem',
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem',
      xlarge: '1.25rem',
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
  space: {
    none: 0,
    gutter: '1rem',
    xsmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  transition: {
    slow: '0.5s',
    normal: '0.3s',
    fast: '0.1s',
  },
  border: {
    radius: {
      small: '0.25rem',
      medium: '0.5rem',
      large: '1rem',
      xlarge: '2rem',
    },
    width: {
      small: '1px',
      medium: '2px',
      large: '4px',
    },
  },
  shadow: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    large: '0 4px 8px 0 rgba(0, 0, 0, 0.05)',
  },
  focus: {
    boxShadow: '0 0 0 2px #AF8EFF',
  },
  color: {
    black: '#000000',
    white: '#ffffff',
    body: '#ffffff',
    primaryLight: '#f5f5f5',
    primary: '#e0e0e0',
    primaryDark: '#aeaeae',
    secondaryLight: '#f5f5f5',
    secondary: '#e0e0e0',
    secondaryDark: '#aeaeae',
    text: '#000000',
    textLight: '#ffffff',
    textDark: '#aeaeae',
    danger: '#ff0000',
    link: '#0000ff',
  },
};
