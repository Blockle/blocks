import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../../lib/css/layers/layers.css';

export const container = style({
  '@layer': {
    [blocksLayer]: {
      position: 'relative',
      writingMode: 'horizontal-tb',
    },
  },
});

export const containerVertical = style({
  '@layer': {
    [blocksLayer]: {
      writingMode: 'vertical-lr',
    },
  },
});

export const track = style({
  '@layer': {
    [blocksLayer]: {
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
    [blocksLayer]: {
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
    [blocksLayer]: {
      cursor: 'pointer',
      position: 'absolute',
      blockSize: '100%',
      insetBlockStart: '50%',
      transform: 'translate(-50%, -50%)',
      touchAction: 'none',
      selectors: {
        [`${containerVertical} &`]: {
          transform: 'translate(-50%, 50%)',
        },
      },
    },
  },
});
