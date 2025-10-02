import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const heading = style({
  '@layer': {
    [blocksLayerComponent]: {
      margin: 0,
      padding: 0,
    },
  },
});
