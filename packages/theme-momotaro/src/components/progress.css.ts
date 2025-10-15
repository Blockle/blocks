import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { keyframes, style } from '@vanilla-extract/css';

const indeterminateAnimation = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

export const progress: ThemeComponentsStyles['progress'] = makeComponentTheme(
  'progress',
  {
    base: style([
      {
        height: 8,
      },
      atoms({
        inlineSize: 'full',
        borderRadius: 'small',
        backgroundColor: 'text-200',
        color: 'primary-500',
        overflow: 'hidden',
      }),
    ]),
    bar: style({
      borderRadius: 'inherit',
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: 'transform 180ms ease-out',
        },
      },
    }),
    variants: {
      indeterminate: style({
        '@media': {
          // For reduce motion we show a striped pattern instead of animating
          '(prefers-reduced-motion: reduce)': {
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            ${vars.color['primary-700']} 20px,
            ${vars.color['primary-700']} 40px
          )`,
          },
          '(prefers-reduced-motion: no-preference)': {
            animation: `${indeterminateAnimation} 3s ease-in-out infinite`,
          },
        },
      }),
    },
  },
);
