const colorsWithCurrentColor = {
  ...vars.color,
  currentColor: 'currentColor',
  transparent: 'transparent',
};
const size = { auto: 'auto', full: '100%', 'fit-content': 'fit-content' };
const marginSpace = { auto: 'auto', ...vars.space };

import { minMediaQuery } from '../css/breakpoint/breakpoint.js';
import { vars } from '../css/vars.css.js';
import { defineProperties } from './defineProperties.js';

const unresponsiveAtomicProperties = defineProperties({
  properties: {
    appearance: ['none'],
    backgroundColor: colorsWithCurrentColor,
    blockSize: size,
    border: ['none'],
    borderColor: colorsWithCurrentColor,
    borderRadius: vars.borderRadius,
    borderWidth: vars.borderWidth,
    boxShadow: vars.shadow,
    color: colorsWithCurrentColor,
    cursor: ['auto', 'pointer'],
    fontFamily: vars.fontFamily,
    fontStyle: ['normal', 'italic', 'oblique'],
    fontWeight: vars.fontWeight,
    inlineSize: size,
    insetBlock: [0],
    insetBlockEnd: [0],
    insetBlockStart: [0],
    insetInline: [0],
    insetInlineEnd: [0],
    insetInlineStart: [0],
    lineHeight: vars.lineHeight,
    maxBlockSize: size,
    maxInlineSize: size,
    opacity: [0, 1],
    outline: ['none'],
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
    textAlign: ['center', 'left', 'right', 'justify'],
  },
});

const responsiveAtomicProperties = defineProperties({
  conditions: [
    {},
    {
      '@media': minMediaQuery('tablet'),
    },
    {
      '@media': minMediaQuery('desktop'),
    },
    {
      '@media': minMediaQuery('wide'),
    },
  ],
  properties: {
    alignContent: ['stretch', 'center', 'flex-start', 'flex-end'],
    alignItems: ['stretch', 'center', 'flex-start', 'flex-end'],
    alignSelf: ['stretch', 'center', 'flex-start', 'flex-end'],
    placeItems: ['stretch', 'center', 'flex-start', 'flex-end'],
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
    margin: marginSpace,
    marginBlock: marginSpace,
    marginBlockEnd: marginSpace,
    marginBlockStart: marginSpace,
    marginInline: marginSpace,
    marginInlineEnd: marginSpace,
    marginInlineStart: marginSpace,
    padding: vars.space,
    paddingBlock: vars.space,
    paddingBlockEnd: vars.space,
    paddingBlockStart: vars.space,
    paddingInline: vars.space,
    paddingInlineEnd: vars.space,
    paddingInlineStart: vars.space,
    position: ['relative', 'fixed', 'absolute', 'sticky', 'static'],
    rowGap: vars.space,
  },
});

export const atomicProperties = {
  ...responsiveAtomicProperties,
  ...unresponsiveAtomicProperties,
};
