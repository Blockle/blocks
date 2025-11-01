import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const divider = style({
  '@layer': {
    [layers.molecule]: {
      clear: 'both',
      blockSize: '1px',
    },
  },
});
