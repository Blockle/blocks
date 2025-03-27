import type { Sprinkles } from './sprinkles.css';

export type ResponsiveValue<T> = T | [T] | [T, T] | [T, T, T] | [T, T, T, T];

export type ResponsiveDisplayFlex = ResponsiveValue<
  'none' | 'flex' | 'inline-flex'
>;

export type MarginSprinkles = {
  margin?: Sprinkles['margin'];
  marginBlock?: Sprinkles['marginBlock'];
  marginBlockStart?: Sprinkles['marginBlockStart'];
  marginBlockEnd?: Sprinkles['marginBlockEnd'];
  marginInline?: Sprinkles['marginInline'];
  marginInlineStart?: Sprinkles['marginInlineStart'];
  marginInlineEnd?: Sprinkles['marginInlineEnd'];
};

export type PaddingSprinkles = {
  padding?: Sprinkles['padding'];
  paddingBlock?: Sprinkles['paddingBlock'];
  paddingBlockStart?: Sprinkles['paddingBlockStart'];
  paddingBlockEnd?: Sprinkles['paddingBlockEnd'];
  paddingInline?: Sprinkles['paddingInline'];
  paddingInlineStart?: Sprinkles['paddingInlineStart'];
  paddingInlineEnd?: Sprinkles['paddingInlineEnd'];
};

export type TextSprinkles = {
  color?: Sprinkles['color'];
  fontFamily?: Sprinkles['fontFamily'];
  fontSize?: Sprinkles['fontSize'];
  fontStyle?: Sprinkles['fontStyle'];
  fontWeight?: Sprinkles['fontWeight'];
  lineHeight?: Sprinkles['lineHeight'];
  textAlign?: Sprinkles['textAlign'];
  textDecoration?: Sprinkles['textDecoration'];
  textTransform?: Sprinkles['textTransform'];
  textWrap?: Sprinkles['textWrap'];
  whiteSpace?: Sprinkles['whiteSpace'];
  wordBreak?: Sprinkles['wordBreak'];
  wordWrap?: Sprinkles['wordWrap'];
};
