import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const numericInputContainer = style({});

export const numericInput = style({
  '@layer': {
    [layers.molecule]: {
      // Hide native number input controls
      MozAppearance: 'textfield',
      selectors: {
        '&::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '&::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
    },
  },
});
