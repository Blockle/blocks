import { keyframes, style } from '@vanilla-extract/css';
import { blocksLayer } from '../../lib/css/layers/layers.css';

export const backdropEnterAnimation = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const backdropLeaveAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const dialogEnterAnimation = keyframes({
  '0%': {
    transform: 'translateY(-20px)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
});

export const dialogLeaveAnimation = keyframes({
  '0%': {
    transform: 'translateY(0)',
  },
  '100%': {
    transform: 'translateY(-20px)',
  },
});

export const backdrop = style({
  '@layer': {
    [blocksLayer]: {
      contain: 'layout',
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      overflow: 'hidden',
      opacity: '0',
      animationName: backdropEnterAnimation,
      // Js listens to animation event, so by default it the animation is 1ms
      animationDuration: '1ms',
      animationFillMode: 'both',
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          animationDuration: '100ms',
        },
      },
    },
  },
});

export const backdropLeave = style({
  '@layer': {
    [blocksLayer]: {
      animationName: backdropLeaveAnimation,
    },
  },
});

export const dialog = style({
  '@layer': {
    [blocksLayer]: {
      animationName: dialogEnterAnimation,
      animationDuration: '1ms',
      animationFillMode: 'forwards',
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          animationDuration: '160ms',
        },
      },
    },
  },
});

export const dialogLeave = style({
  '@layer': {
    [blocksLayer]: {
      animationName: dialogLeaveAnimation,
    },
  },
});
