import { type ColorRole, colorRoles } from '../config/colorRoles.js';
import type {
  PaletteTokens,
  SchemeTokens,
  ThemeTokens,
} from '../config/themeTokens.js';
import type { VanillaThemeInput } from '../theme/makeVanillaTheme.js';
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

const themeTokens: DeepNullable<ThemeTokens> = {
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
      display: null,
    },
    fontWeight: {
      light: null,
      normal: null,
      medium: null,
      strong: null,
      bold: null,
    },
    lineHeight: {
      compact: null,
      snug: null,
      normal: null,
      relaxed: null,
    },
    letterSpacing: {
      tight: null,
      normal: null,
      wide: null,
      wider: null,
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
};

const palette: DeepNullable<PaletteTokens> = {
  black: null,
  white: null,
  primary: colorPalette,
  secondary: colorPalette,
  success: colorPalette,
  warning: colorPalette,
  danger: colorPalette,
  info: colorPalette,
  neutral: colorPalette,
};

const scheme: DeepNullable<SchemeTokens> = {
  color: Object.fromEntries(colorRoles.map((role) => [role, null])) as Record<
    ColorRole,
    null
  >,
  shadow: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  },
};

/**
 * Theme input with null values, used to create the theme contract.
 */
const nullInput: DeepNullable<VanillaThemeInput> = {
  tokens: themeTokens,
  palette,
  schemes: {
    light: scheme,
    dark: scheme,
  },
};

export const tokens = nullInput as VanillaThemeInput;
