import { keyframes, style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';

const indeterminateAnimation = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

export const progress = makeComponentTheme('progress', {
  container: style([
    {
      height: 6,
    },
    atoms({
      width: 'full',
      borderRadius: 'small',
      backgroundColor: 'textLight',
      color: 'primary',
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
      animation: `${indeterminateAnimation} 10s ease-in-out infinite`,
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          animationDuration: '3s',
        },
      },
    }),
  },
});
