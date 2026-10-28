import type { ColorRoles, ThemeTokens } from '../config/themeTokens.js';
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

const intentRoleTokens = {
  solid: null,
  solidHover: null,
  subtle: null,
  contrast: null,
  foreground: null,
  border: null,
} as const;

/**
 * The Color roles without their per-mode values: the shape of the role contract.
 * Mirror `ColorRoles`.
 */
export const colorRoleTokens: {
  [Group in keyof ColorRoles]: Record<keyof ColorRoles[Group], null>;
} = {
  text: {
    default: null,
    muted: null,
    disabled: null,
    inverse: null,
  },

  // --- Neutral roles, shadows and focus ring (T283) ---
  surface: {
    default: null,
    raised: null,
    sunken: null,
    inverse: null,
  },
  border: {
    default: null,
    strong: null,
  },
  focusRing: {
    color: null,
    boxShadow: null,
  },
  overlay: {
    default: null,
  },
  shadow: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  },
  // --- End of neutral roles ---

  // --- Intent roles (T284) ---
  intentPrimary: intentRoleTokens,
  intentSecondary: intentRoleTokens,
  intentNeutral: intentRoleTokens,
  intentDanger: intentRoleTokens,
  intentSuccess: intentRoleTokens,
  intentInfo: intentRoleTokens,
  intentWarning: intentRoleTokens,
  // --- end Intent roles ---
};

/** The null template of all tokens except the Color roles, see `colorRoleTokens`. */
export const tokens: DeepNullable<Omit<ThemeTokens, 'colorRoles'>> = {
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
  color: {
    black: null,
    white: null,
    primary: colorPalette,
    secondary: colorPalette,
    success: colorPalette,
    warning: colorPalette,
    danger: colorPalette,
    info: colorPalette,
    neutral: colorPalette,
  },
};
