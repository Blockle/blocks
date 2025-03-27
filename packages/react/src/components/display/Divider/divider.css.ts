import { blocksLayer } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const divider = style({
  '@layer': {
    [blocksLayer]: {
      clear: 'both',
      blockSize: '1px',
    },
  },
});
