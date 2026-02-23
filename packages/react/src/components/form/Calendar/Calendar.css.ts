import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const weekGrid = style({
  '@layer': {
    [layers.molecule]: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
  },
});
