import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../../lib/css/layers/layers.css';

export const heading = style({
  '@layer': {
    [blocksLayer]: {
      margin: 0,
      padding: 0,
    },
  },
});
