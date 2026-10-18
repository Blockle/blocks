type FontWeight = 'light' | 'normal' | 'medium' | 'strong' | 'bold';
type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Transition = 'slow' | 'normal' | 'fast';
type BorderRadius = 1 | 2 | 3 | 4;
type BorderWidth = 'thin' | 'thick';
type BoxShadow = 1 | 2 | 3 | 4 | 5;
type FontSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'display';
type LineHeight = 'compact' | 'snug' | 'normal' | 'relaxed';
type LetterSpacing = 'tight' | 'normal' | 'wide' | 'wider';

type ColorPalette =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type PaletteScale = Record<ColorPalette, string>;

/**
 * Fixed scales of shades that do not change with the Color scheme.
 */
export type PaletteTokens = {
  white: string;
  black: string;
  background: PaletteScale;
  danger: PaletteScale;
  info: PaletteScale;
  neutral: PaletteScale;
  primary: PaletteScale;
  secondary: PaletteScale;
  success: PaletteScale;
  text: PaletteScale;
  warning: PaletteScale;
};

export type Intent =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'danger'
  | 'success'
  | 'info'
  | 'warning';

type IntentColorRoles = Record<Intent, string> &
  Record<`${Intent}Hover`, string> &
  Record<`${Intent}Subtle`, string> &
  Record<`on${Capitalize<Intent>}`, string>;

/**
 * Purpose-named colors whose value differs per Color scheme.
 * Values can be any CSS color string.
 */
export type ColorRoles = IntentColorRoles & {
  surface: string;
  surfaceRaised: string;
  surfaceSunken: string;
  surfaceInverse: string;
  text: string;
  textMuted: string;
  textInverse: string;
  textDisabled: string;
  border: string;
  borderStrong: string;
  overlay: string;
  focusRing: string;
};

export type ColorRole = keyof ColorRoles;

/**
 * Tokens that depend on the Color scheme.
 */
export type SchemeTokens = {
  color: ColorRoles;
  shadow: Record<BoxShadow, string>;
};

/**
 * Tokens that do not depend on the Color scheme.
 */
export type ThemeTokens = {
  typography: {
    fontFamily: {
      body?: string;
      heading?: string;
      mono?: string;
    };
    fontSize: Record<FontSize, number | string>;
    fontWeight: Record<FontWeight, 300 | 400 | 500 | 600 | 700 | 800>;
    lineHeight: Record<LineHeight, number | string>;
    letterSpacing: Record<LetterSpacing, number | string>;
  };
  spacing: Record<Space, number | string>;
  transition: Record<Transition, string>;
  border: {
    radius: Record<BorderRadius, number | string>;
    width: Record<BorderWidth, number | string>;
  };
  focus: {
    boxShadow: string;
  };
};
