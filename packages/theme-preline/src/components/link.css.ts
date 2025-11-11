import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const link: ThemeComponentsStyles['link'] = makeComponentTheme('link', {
  base: style([
    {
      outline: 'none',
      border: 'none',
      textDecoration: 'none',
      background: 'transparent',
      borderRadius: 1,
      ':hover': {
        textDecoration: 'underline',
      },
      ':focus-visible': {
        textDecoration: 'underline',
      },
      cursor: 'pointer',
      // selectors: {
      //   '&[target="_blank"]::after': {
      //     content: '"\\2197"',
      //     marginLeft: 4,
      //   },
      // },
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
        color: 'primary-500',
        fontWeight: 'medium',
      }),
      secondary: atoms({
        color: 'secondary-500',
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
