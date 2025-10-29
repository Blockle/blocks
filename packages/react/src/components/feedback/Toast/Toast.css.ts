import { vars } from '@blockle/blocks-core';
import { keyframes, style } from '@vanilla-extract/css';

const animateIn = keyframes({
  from: { opacity: 0, scale: 0.9, translate: '0 20%' },
  to: { opacity: 1, scale: 1, translate: '0 0' },
});

export const container = style({
  animationName: animateIn,
  animationDuration: '300ms',
  animationTimingFunction: 'ease-out',
  backgroundColor: vars.color['primary-400'],
});
