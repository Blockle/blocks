import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const container = style({
  '@layer': {
    [layers.molecule]: {
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
    [layers.molecule]: {
      appearance: 'none',
    },
  },
});

export const icon = style({
  pointerEvents: 'none',
});
