type FontWeight = 'regular' | 'medium' | 'strong';
type Space = 'none' | 'gutter' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
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
  | 'caution'
  | 'link';

export type BlocksTokens = {
  typography: {
    fontFamily: {
      standard: string;
      secondary?: string; // Review naming
    };
    fontSize: Record<FontSize, number | string>;
    fontWeight: Record<FontWeight, 400 | 500 | 600 | 700 | 800>;
    lineHeight: Record<LineHeight, number | string>;
  };
  space: Record<Space, number | string>;
  transition: Record<Transition, string>;
  border: {
    radius: Record<BorderRadius, number | string>;
    width: Record<BorderWidth, number | string>;
    // border color should match BlocksTokens['color']
  };
  shadow: Record<BoxShadow, string>;
  // focusRingSize: number | string; ??
  color: Record<Color, string>;
};
