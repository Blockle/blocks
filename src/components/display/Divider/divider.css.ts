import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../../lib/css/layers/layers.css';

export const divider = style({
  '@layer': {
    [blocksLayer]: {
      clear: 'both',
      blockSize: '1px',
    },
  },
});
