import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const container = style({
  '@layer': {
    [layers.molecule]: {
      position: 'relative',
      writingMode: 'horizontal-tb',
    },
  },
});

export const containerVertical = style({
  '@layer': {
    [layers.molecule]: {
      writingMode: 'vertical-lr',
    },
  },
});

export const track = style({
  '@layer': {
    [layers.molecule]: {
      cursor: 'pointer',
      position: 'absolute',
      inlineSize: '100%',
      insetBlockStart: '50%',
      transform: 'translateY(-50%)',
      selectors: {
        [`${containerVertical} &`]: {
          transform: 'translateX(-50%)',
        },
      },
    },
  },
});

export const filledTrack = style({
  '@layer': {
    [layers.molecule]: {
      position: 'absolute',
      blockSize: '100%',
      borderRadius: 'inherit',
      selectors: {
        [`${containerVertical} &`]: {
          insetInlineEnd: '0%',
        },
      },
    },
  },
});

export const thumb = style({
  '@layer': {
    [layers.molecule]: {
      cursor: 'pointer',
      position: 'absolute',
      blockSize: '100%',
      insetBlockStart: '50%',
      transform: 'translate(-50%, -50%)',
      touchAction: 'none',
      border: 'none',
      selectors: {
        [`${containerVertical} &`]: {
          transform: 'translate(-50%, 50%)',
        },
      },
    },
  },
});
