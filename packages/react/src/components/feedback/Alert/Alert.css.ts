import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const closeButton = style({
  '@layer': {
    [layers.molecule]: {
      color: 'currentColor',
    },
  },
});
