import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../lib/css/layers/layers.css';

export const container = style({
  '@layer': {
    [blocksLayer]: {
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
    [blocksLayer]: {
      all: 'unset',
    },
  },
});

export const icon = style({
  pointerEvents: 'none',
});
