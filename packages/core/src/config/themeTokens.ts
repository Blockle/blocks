type FontWeight = 'light' | 'normal' | 'medium' | 'strong' | 'bold';
type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Transition = 'slow' | 'normal' | 'fast';
type BorderRadius = 'small' | 'medium' | 'large' | 'xlarge';
type BorderWidth = 'thin' | 'thick';
type BoxShadow = 'small' | 'medium' | 'large';
type FontSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type LineHeight = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

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

type Color = {
  white: string;
  black: string;
  primary: Record<ColorPalette, string>;
  secondary: Record<ColorPalette, string>;
  success: Record<ColorPalette, string>;
  warning: Record<ColorPalette, string>;
  danger: Record<ColorPalette, string>;
  info: Record<ColorPalette, string>;
  text: Record<ColorPalette, string>;
  background: Record<ColorPalette, string>;
};

export type ThemeTokens = {
  typography: {
    fontFamily: {
      // Review naming
      body?: string;
      primary?: string;
      secondary?: string;
    };
    fontSize: Record<FontSize, number | string>;
    fontWeight: Record<FontWeight, 300 | 400 | 500 | 600 | 700 | 800>;
    lineHeight: Record<LineHeight, number | string>;
  };
  spacing: Record<Space, number | string>;
  transition: Record<Transition, string>;
  border: {
    radius: Record<BorderRadius, number | string>;
    width: Record<BorderWidth, number | string>;
  };
  shadow: Record<BoxShadow, string>;
  focus: {
    boxShadow: string;
  };
  color: Color;
};
