import { blocksLayer } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const text = style({
  '@layer': {
    [blocksLayer]: {
      margin: 0,
      padding: 0,
    },
  },
});
