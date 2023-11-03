import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../lib/css/layers/layers.css';

export const input = style({
  '@layer': {
    [blocksLayer]: {
      appearance: 'none',
      selectors: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
        },
      },
    },
  },
});
