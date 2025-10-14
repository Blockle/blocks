import type { ThemeTokens } from '../config/themeTokens.js';
import type { DeepNullable } from '../utils/typing/helpers.js';

const colorPalette = {
  100: null,
  200: null,
  300: null,
  400: null,
  500: null,
  600: null,
  700: null,
  800: null,
  900: null,
} as const;

export const tokens: DeepNullable<ThemeTokens> = {
  typography: {
    fontFamily: {
      body: null,
      primary: null,
      secondary: null,
    },
    fontSize: {
      xsmall: null,
      small: null,
      medium: null,
      large: null,
      xlarge: null,
    },
    fontWeight: {
      regular: null,
      medium: null,
      strong: null,
    },
    lineHeight: {
      xsmall: null,
      small: null,
      medium: null,
      large: null,
      xlarge: null,
    },
  },
  spacing: {
    none: null,
    gutter: null,
    xsmall: null,
    small: null,
    medium: null,
    large: null,
    xlarge: null,
  },
  transition: {
    slow: null,
    normal: null,
    fast: null,
  },
  border: {
    radius: {
      small: null,
      medium: null,
      large: null,
      xlarge: null,
    },
    width: {
      small: null,
      medium: null,
      large: null,
    },
  },
  shadow: {
    small: null,
    medium: null,
    large: null,
  },
  focus: {
    boxShadow: null,
  },
  color: {
    black: null,
    white: null,
    primary: colorPalette,
    secondary: colorPalette,
    success: colorPalette,
    warning: colorPalette,
    danger: colorPalette,
    info: colorPalette,
    background: colorPalette,
    text: colorPalette,
  },
};
