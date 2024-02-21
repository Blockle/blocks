import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../../lib/css/layers/layers.css';

export const container = style({
  '@layer': {
    [blocksLayer]: {
      cursor: 'pointer',
      userSelect: 'none',
      position: 'relative',
    },
  },
});

export const input = style({
  '@layer': {
    [blocksLayer]: {
      opacity: 0,
      maxHeight: 0,
      maxWidth: 0,
    },
  },
});
