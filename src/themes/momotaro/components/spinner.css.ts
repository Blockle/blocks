import { keyframes, style } from '@vanilla-extract/css';
import { makeComponentTheme } from '../../../lib/css/theme/makeComponentTheme';

const spinAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const spinner = makeComponentTheme({
  type: 'spinner',
  base: style({
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderRadius: '50%',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: 'currentColor transparent currentColor transparent',
    animation: `${spinAnimation} 1.2s linear infinite`,
  }),
  variants: {
    // note: colors are handled by atoms
    size: {
      small: style({
        width: 16,
      }),
      medium: style({
        width: 24,
      }),
      large: style({
        width: 32,
      }),
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
