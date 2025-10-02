import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const buttonReset = style({
  '@layer': {
    [blocksLayerComponent]: {
      all: 'unset',
      cursor: 'pointer',
    },
  },
});
