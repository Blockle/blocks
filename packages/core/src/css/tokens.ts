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
  // mode: 'light', ??
  typography: {
    fontFamily: {
      body: null,
      heading: null,
      mono: null,
    },
    fontSize: {
      xsmall: null,
      small: null,
      medium: null,
      large: null,
      xlarge: null,
    },
    fontWeight: {
      light: null,
      normal: null,
      medium: null,
      strong: null,
      bold: null,
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
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  },
  transition: {
    slow: null,
    normal: null,
    fast: null,
  },
  border: {
    radius: {
      1: null,
      2: null,
      3: null,
      4: null,
    },
    width: {
      thin: null,
      thick: null,
    },
  },
  shadow: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
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
