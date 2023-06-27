import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../lib/css/layers/layers.css';

export const buttonReset = style({
  '@layer': {
    [blocksLayer]: {
      all: 'unset',
      cursor: 'pointer',
    },
  },
});
