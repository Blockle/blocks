import type { Atoms } from './atoms';

export type ResponsiveValue<T> = T | [T] | [T, T] | [T, T, T] | [T, T, T, T];

export type ResponsiveDisplayFlex = ResponsiveValue<
  'none' | 'flex' | 'inline-flex'
>;

export type MarginAtoms = {
  margin?: Atoms['margin'];
  marginBlock?: Atoms['marginBlock'];
  marginBlockStart?: Atoms['marginBlockStart'];
  marginBlockEnd?: Atoms['marginBlockEnd'];
  marginInline?: Atoms['marginInline'];
  marginInlineStart?: Atoms['marginInlineStart'];
  marginInlineEnd?: Atoms['marginInlineEnd'];
};

export type PaddingAtoms = {
  padding?: Atoms['padding'];
  paddingBlock?: Atoms['paddingBlock'];
  paddingBlockStart?: Atoms['paddingBlockStart'];
  paddingBlockEnd?: Atoms['paddingBlockEnd'];
  paddingInline?: Atoms['paddingInline'];
  paddingInlineStart?: Atoms['paddingInlineStart'];
  paddingInlineEnd?: Atoms['paddingInlineEnd'];
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
