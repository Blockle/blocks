import {
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const link: ThemeComponentsStyles['link'] = makeComponentTheme('link', {
  root: style([
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
      primary: style({
        color: vars.colorRole.intentPrimary.foreground,
        fontWeight: 500,
      }),
      secondary: style({
        color: vars.colorRole.intentSecondary.foreground,
        fontWeight: 500,
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
