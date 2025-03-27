import { blocksLayer } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const container = style({
  '@layer': {
    [blocksLayer]: {
      cursor: 'pointer',
      userSelect: 'none',
      position: 'relative',
    },
  },
});

export const input = style({
  '@layer': {
    [blocksLayer]: {
      opacity: 0,
      maxBlockSize: 0,
      maxInlineSize: 0,
    },
  },
});
