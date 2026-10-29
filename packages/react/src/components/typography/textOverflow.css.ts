import { layers } from '@blockle/blocks-core';
import { style, styleVariants } from '@vanilla-extract/css';

// The molecule layer lets these win over display, overflow and whiteSpace atoms.
export const lineClamp = styleVariants(
  { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
  (lines) => ({
    '@layer': {
      [layers.molecule]: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        overflow: 'hidden',
      },
    },
  }),
);

export const truncate = style({
  '@layer': {
    [layers.molecule]: {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
});
