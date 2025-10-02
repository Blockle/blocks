import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const input = style({
  '@layer': {
    [blocksLayerComponent]: {
      appearance: 'none',
      width: '100%',
      selectors: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
        },
      },
    },
  },
});
