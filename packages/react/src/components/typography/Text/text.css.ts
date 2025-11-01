import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const text = style({
  '@layer': {
    [layers.molecule]: {
      margin: 0,
      padding: 0,
    },
  },
});
