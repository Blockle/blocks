import { layers } from '@blockle/blocks-core';
import { style, styleVariants } from '@vanilla-extract/css';

// These are base styles in the molecule layer, so an explicit display, overflow
// or whiteSpace atom wins over them.
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
