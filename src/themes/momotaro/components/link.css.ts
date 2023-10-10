import { style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { focusable } from './helpers.css';

export const link = makeComponentTheme('link', {
  base: style([
    {
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
      cursor: 'pointer',
    },
    focusable,
  ]),
  variants: {
    variant: {
      inherit: style({
        color: 'inherit',
        fontWeight: 'inherit',
      }),
      primary: atoms({
        color: 'primary',
        fontWeight: 'medium',
      }),
      secondary: atoms({
        color: 'secondary',
        fontWeight: 'medium',
      }),
    },
    underline: style({
      textDecoration: 'underline',
    }),
  },
  defaultVariants: {
    variant: 'primary',
  },
});
