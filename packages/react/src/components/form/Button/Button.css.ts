import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const buttonReset = style({
  '@layer': {
    [layers.reset]: {
      cursor: 'pointer',
    },
  },
});
