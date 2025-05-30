import { blocksLayer } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  '@layer': {
    [blocksLayer]: {
      position: 'relative',
    },
  },
});

export const select = style({
  '@layer': {
    [blocksLayer]: {
      appearance: 'none',
      inlineSize: '100%',
    },
  },
});

export const icon = style({
  '@layer': {
    [blocksLayer]: {
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
