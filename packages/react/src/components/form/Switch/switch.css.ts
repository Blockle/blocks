import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const container = style({
  '@layer': {
    [layers.molecule]: {
      flexShrink: 0,
      cursor: 'pointer',
      userSelect: 'none',
      position: 'relative',
    },
  },
});

export const input = style({
  '@layer': {
    [layers.molecule]: {
      opacity: 0,
      maxBlockSize: 0,
      maxInlineSize: 0,
    },
  },
});
