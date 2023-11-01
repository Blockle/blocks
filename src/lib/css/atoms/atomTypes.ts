import { atoms } from './sprinkles.css';

export type Atoms = Parameters<typeof atoms>[0];

export type ResponsiveValue<T> = T | [T] | [T, T] | [T, T, T] | [T, T, T, T];

export type ResponsiveDisplayFlex = ResponsiveValue<'none' | 'flex' | 'inline-flex'>;

export type MarginAtoms = {
  margin?: Atoms['margin'];
  marginLeft?: Atoms['marginLeft'];
  marginRight?: Atoms['marginRight'];
  marginTop?: Atoms['marginTop'];
  marginBottom?: Atoms['marginBottom'];
  marginX?: Atoms['marginX'];
  marginY?: Atoms['marginY'];
};

export type PaddingAtoms = {
  padding?: Atoms['padding'];
  paddingLeft?: Atoms['paddingLeft'];
  paddingRight?: Atoms['paddingRight'];
  paddingTop?: Atoms['paddingTop'];
  paddingBottom?: Atoms['paddingBottom'];
  paddingX?: Atoms['paddingX'];
  paddingY?: Atoms['paddingY'];
};

export type TextAtoms = {
  color?: Atoms['color'];
  fontFamily?: Atoms['fontFamily'];
  fontSize?: Atoms['fontSize'];
  fontStyle?: Atoms['fontStyle'];
  fontWeight?: Atoms['fontWeight'];
  lineHeight?: Atoms['lineHeight'];
  textAlign?: Atoms['textAlign'];
  textDecoration?: Atoms['textDecoration'];
  textTransform?: Atoms['textTransform'];
  textWrap?: Atoms['textWrap'];
  whiteSpace?: Atoms['whiteSpace'];
  wordBreak?: Atoms['wordBreak'];
  wordWrap?: Atoms['wordWrap'];
};
