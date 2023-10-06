import { style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { makeComponentTheme } from '../../../lib/css/theme/makeComponentTheme';

export const link = makeComponentTheme({
  type: 'link',
  base: style({
    outline: 'none',
    border: 'none',
    textDecoration: 'none',
    background: 'transparent',
    ':hover': {
      textDecoration: 'underline',
    },
    ':focus-visible': {
      textDecoration: 'underline',
    },
  }),
  variants: {
    // ...
    // styleVariants could be used to but lacks correct typings atm
    variant: {
      // inherit
      primary: atoms({
        color: 'primary',
        fontWeight: 'medium',
      }),
      secondary: atoms({
        color: 'secondary',
        fontWeight: 'medium',
      }),
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
