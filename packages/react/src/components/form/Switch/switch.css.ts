import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const container = style({
  '@layer': {
    [blocksLayerComponent]: {
      cursor: 'pointer',
      userSelect: 'none',
      position: 'relative',
    },
  },
});

export const input = style({
  '@layer': {
    [blocksLayerComponent]: {
      opacity: 0,
      maxBlockSize: 0,
      maxInlineSize: 0,
    },
  },
});
