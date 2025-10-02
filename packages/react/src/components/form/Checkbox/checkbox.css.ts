import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const container = style({
  '@layer': {
    [blocksLayerComponent]: {
      position: 'relative',
      cursor: 'pointer',
      overflow: 'hidden',
    },
  },
});

export const input = style({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  '@layer': {
    [blocksLayerComponent]: {
      all: 'unset',
    },
  },
});

export const icon = style({
  pointerEvents: 'none',
});
