import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const divider = style({
  '@layer': {
    [blocksLayerComponent]: {
      clear: 'both',
      blockSize: '1px',
    },
  },
});
