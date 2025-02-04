import { vars } from '../../theme/vars.css';

const colorsWithCurrentColor = { ...vars.color, currentColor: 'currentColor' };

const size = { auto: 'auto', full: '100%', 'fit-content': 'fit-content' };

export const unresponsiveProperties = {
  backgroundColor: colorsWithCurrentColor,
  borderColor: colorsWithCurrentColor,
  borderRadius: vars.borderRadius,
  borderWidth: vars.borderWidth,
  border: ['none'],
  insetBlock: [0],
  insetBlockStart: [0],
  insetBlockEnd: [0],
  insetInline: [0],
  insetInlineStart: [0],
  insetInlineEnd: [0],
  boxShadow: vars.shadow,
  color: colorsWithCurrentColor,
  cursor: ['auto', 'pointer'],
  fontFamily: vars.fontFamily,
  fontStyle: ['normal', 'italic', 'oblique'],
  fontWeight: vars.fontWeight,
  lineHeight: vars.lineHeight,
  blockSize: size,
  maxBlockSize: size,
  inlineSize: size,
  maxInlineSize: size,
  opacity: [0, 1],
  overflow: ['hidden', 'scroll', 'visible', 'auto'],
  overflowBlock: ['hidden', 'scroll', 'visible', 'auto'],
  overflowInline: ['hidden', 'scroll', 'visible', 'auto'],
  pointerEvents: ['none'],
  textDecoration: ['overline', 'line-through', 'underline', 'none'],
  textTransform: ['lowercase', 'uppercase', 'capitalize'],
  textWrap: ['balance', 'wrap'],
  transition: vars.transition,
  userSelect: ['none'],
  whiteSpace: ['nowrap', 'pre', 'pre-line', 'pre-wrap'],
  wordBreak: ['break-word'],
  wordWrap: ['break-word'],
} as const;

export type UnresponsiveProperties = keyof typeof unresponsiveProperties;

const marginSpace = { auto: 'auto', ...vars.space };

export const responsiveProperties = {
  alignContent: ['stretch', 'center', 'flex-start', 'flex-end'],
  alignItems: ['stretch', 'center', 'flex-start', 'flex-end'],
  alignSelf: ['stretch', 'center', 'flex-start', 'flex-end'],
  columnGap: vars.space,
  display: [
    'none',
    'flex',
    'inline-flex',
    'block',
    'inline',
    'inline-block',
    'grid',
    'inline-grid',
  ],
  flex: [1],
  flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
  flexGrow: [0, 1],
  flexShrink: [0, 1],
  flexWrap: ['nowrap', 'wrap'],
  fontSize: vars.fontSize,
  gap: vars.space,
  justifyContent: [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
  ],
  marginBlockStart: marginSpace,
  marginBlockEnd: marginSpace,
  marginInlineStart: marginSpace,
  marginInlineEnd: marginSpace,
  outline: ['none'],
  padding: vars.space,
  paddingBlock: vars.space,
  paddingBlockStart: vars.space,
  paddingBlockEnd: vars.space,
  paddingInline: vars.space,
  paddingInlineStart: vars.space,
  paddingInlineEnd: vars.space,
  position: ['relative', 'fixed', 'absolute', 'sticky', 'static'],
  rowGap: vars.space,
  textAlign: ['center', 'left', 'right', 'justify'],
} as const;

export type ResponsiveProperties = keyof typeof responsiveProperties;
