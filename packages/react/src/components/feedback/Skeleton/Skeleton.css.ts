import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.4 },
  '100%': { opacity: 1 },
});

export const skeleton = style({
  minHeight: '24px',
  '@media': {
    'screen and (prefers-reduced-motion: no-preference)': {
      animationName: pulse,
      animationDuration: '3s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    },
  },
});
