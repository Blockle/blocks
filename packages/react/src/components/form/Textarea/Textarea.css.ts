import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const textarea = style({
  '@layer': {
    [layers.molecule]: {
      width: '100%',
      minHeight: 'inherit',
      resize: 'none',
      display: 'block',
    },
  },
});

export const fieldSizingEnabled = style({
  fieldSizing: 'content',
});
