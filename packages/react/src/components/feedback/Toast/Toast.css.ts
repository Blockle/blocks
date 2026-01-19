import { layers } from '@blockle/blocks-core';
import { keyframes, style } from '@vanilla-extract/css';

const toastEnter = keyframes({
  from: { opacity: 0, scale: 0.9, translate: '0 20%' },
  to: { opacity: 1, scale: 1, translate: '0 0' },
});

export const container = style({
  '@layer': {
    [layers.molecule]: {
      animationName: toastEnter,
      animationDuration: '240ms',
      animationTimingFunction: 'ease-out',
      height: 'fit-content',
    },
  },
});
