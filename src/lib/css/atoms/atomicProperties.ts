import { vars } from '../theme/vars.css';

export const unresponsiveProperties = {
  backgroundColor: vars.color,
  borderRadius: vars.borderRadius,
  bottom: [0],
  boxShadow: vars.shadow,
  color: { ...vars.color, currentColor: 'currentColor' },
  cursor: ['auto', 'pointer'],
  fontFamily: vars.fontFamily,
  fontStyle: ['normal', 'italic', 'oblique'],
  fontWeight: vars.fontWeight,
  height: { auto: 'auto', full: '100%' },
  left: [0],
  lineHeight: vars.lineHeight,
  maxHeight: { full: '100%' },
  maxWidth: { full: '100%' },
  opacity: [0, 1],
  overflow: ['hidden', 'scroll', 'visible', 'auto'],
  overflowX: ['hidden', 'scroll', 'visible', 'auto'],
  overflowY: ['hidden', 'scroll', 'visible', 'auto'],
  pointerEvents: ['none'],
  right: [0],
  textDecoration: ['overline', 'line-through', 'underline', 'none'],
  textTransform: ['lowercase', 'uppercase', 'capitalize'],
  top: [0],
  transition: vars.transition,
  userSelect: ['none'],
  whiteSpace: ['nowrap', 'pre', 'pre-line', 'pre-wrap'],
  width: { auto: 'auto', full: '100%', 'fit-content': 'fit-content' },
  wordBreak: ['break-word'],
  wordWrap: ['break-word'],
} as const;

export type UnresponsiveProperties = keyof typeof unresponsiveProperties;

const marginSpace = { auto: 'auto', ...vars.space };

export const responsiveProperties = {
  alignItems: ['stretch', 'center', 'flex-start', 'flex-end'],
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
  justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
  marginBottom: marginSpace,
  marginLeft: marginSpace,
  marginRight: marginSpace,
  marginTop: marginSpace,
  outline: ['none'],
  paddingBottom: vars.space,
  paddingLeft: vars.space,
  paddingRight: vars.space,
  paddingTop: vars.space,
  position: ['relative', 'fixed', 'absolute', 'sticky', 'static'],
  rowGap: vars.space,
  textAlign: ['center', 'left', 'right', 'justify'],
} as const;

export type ResponsiveProperties = keyof typeof responsiveProperties;
