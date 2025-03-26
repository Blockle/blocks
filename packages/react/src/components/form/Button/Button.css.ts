import { blocksLayer } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const buttonReset = style({
  '@layer': {
    [blocksLayer]: {
      all: 'unset',
      cursor: 'pointer',
    },
  },
});
