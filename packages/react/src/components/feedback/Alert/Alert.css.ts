import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const closeButton = style({
  '@layer': {
    [blocksLayerComponent]: {
      color: 'currentColor',
    },
  },
});
