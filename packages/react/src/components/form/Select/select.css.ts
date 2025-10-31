import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  '@layer': {
    [layers.molecule]: {
      position: 'relative',
    },
  },
});

export const select = style({
  '@layer': {
    [layers.molecule]: {
      appearance: 'none',
      inlineSize: '100%',
    },
  },
});

export const icon = style({
  '@layer': {
    [layers.molecule]: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
    },
  },
});
