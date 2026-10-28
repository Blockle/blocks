import type { ModeValue } from './colorMode.js';

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

/** The Palette: the intent scales plus the fixed `white` and `black`. */
type Color = {
  white: string;
  black: string;
  danger: Record<ColorPalette, string>;
  info: Record<ColorPalette, string>;
  neutral: Record<ColorPalette, string>;
  primary: Record<ColorPalette, string>;
  secondary: Record<ColorPalette, string>;
  success: Record<ColorPalette, string>;
  warning: Record<ColorPalette, string>;
};

type TextRole = 'default' | 'muted' | 'disabled' | 'inverse';
type SurfaceRole = 'default' | 'raised' | 'sunken' | 'inverse';
type BorderRole = 'default' | 'strong';
/** `color` is the ring color, `boxShadow` the full focus ring box-shadow. */
type FocusRingRole = 'color' | 'boxShadow';
type OverlayRole = 'default';

type IntentRole =
  | 'solid'
  | 'solidHover'
  | 'subtle'
  | 'contrast'
  | 'foreground'
  | 'border';

/**
 * A Color role value: a Palette reference such as `neutral-900` (or `white`),
 * or a raw CSS color. Palette references are resolved to the palette's color
 * when the theme is made.
 */
type ColorRoleValue = string;

/**
 * Color roles: shared, purpose-named colors with a value for every Color mode.
 * Add a group (or a role) here and in `css/tokens.ts` to extend the theme.
 */
export type ColorRoles = {
  text: Record<TextRole, ModeValue<ColorRoleValue>>;

  surface: Record<SurfaceRole, ModeValue<ColorRoleValue>>;
  border: Record<BorderRole, ModeValue<ColorRoleValue>>;
  focusRing: Record<FocusRingRole, ModeValue<ColorRoleValue>>;
  overlay: Record<OverlayRole, ModeValue<ColorRoleValue>>;
  /** Elevation levels. Dark themes usually need stronger shadows. */
  shadow: Record<BoxShadow, ModeValue<ColorRoleValue>>;

  // Every Intent has the same role family: `solid` (fill), `solidHover`,
  // `subtle` (tinted surface), `contrast` (content on `solid`), `foreground`
  // (intent-colored content on a neutral surface) and `border`.
  primary: Record<IntentRole, ModeValue<ColorRoleValue>>;
  secondary: Record<IntentRole, ModeValue<ColorRoleValue>>;
  neutral: Record<IntentRole, ModeValue<ColorRoleValue>>;
  danger: Record<IntentRole, ModeValue<ColorRoleValue>>;
  success: Record<IntentRole, ModeValue<ColorRoleValue>>;
  info: Record<IntentRole, ModeValue<ColorRoleValue>>;
  warning: Record<IntentRole, ModeValue<ColorRoleValue>>;
};

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
  color: Color;
  colorRoles: ColorRoles;
};
