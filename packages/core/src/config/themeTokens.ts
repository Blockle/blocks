type FontWeight = 'regular' | 'medium' | 'strong';
type Space =
  | 'none'
  | 'gutter'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';
type Transition = 'slow' | 'normal' | 'fast';
type BorderRadius = 'small' | 'medium' | 'large' | 'xlarge';
type BorderWidth = 'small' | 'medium' | 'large';
type BoxShadow = 'small' | 'medium' | 'large';
type FontSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type LineHeight = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
// TODO Review color naming
type Color =
  | 'white'
  | 'black'
  | 'body'
  | 'primaryLight'
  | 'primary'
  | 'primaryDark'
  | 'secondaryLight'
  | 'secondary'
  | 'secondaryDark'
  | 'text'
  | 'textLight'
  | 'textDark'
  | 'danger'
  | 'link';

export type ThemeTokens = {
  typography: {
    fontFamily: {
      // Review naming
      body?: string;
      primary?: string;
      secondary?: string;
    };
    fontSize: Record<FontSize, number | string>;
    fontWeight: Record<FontWeight, 400 | 500 | 600 | 700 | 800>;
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
  color: Record<Color, string>;
};
