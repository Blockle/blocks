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

// Sits above the theme, so the theme's minimum height can't keep a growing
// textarea from starting at a single row, and below an app's own CSS
export const containerGrow = style({
  '@layer': {
    [layers.atom]: {
      minBlockSize: 'auto',
    },
  },
});

export const containerFill = style({
  '@layer': {
    [layers.molecule]: {
      blockSize: '100%',
    },
  },
});

export const textareaFill = style({
  '@layer': {
    [layers.molecule]: {
      minBlockSize: '100%',
    },
  },
});
