import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const link: ThemeComponentsStyles['link'] = makeComponentTheme('link', {
  root: style([
    {
      '@layer': {
        [layers.theme]: {
          outline: 'none',
          border: 'none',
          textDecoration: 'none',
          background: 'transparent',
          borderRadius: vars.borderRadius[1],
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
      },
    },
    focusable,
  ]),
  variants: {
    intent: {
      inherit: style({
        '@layer': {
          [layers.theme]: {
            color: 'inherit',
            fontWeight: 'inherit',
          },
        },
      }),
      primary: style({
        '@layer': {
          [layers.theme]: {
            color: vars.colorRole.primary.foreground,
            fontWeight: 500,
          },
        },
      }),
      neutral: style({
        '@layer': {
          [layers.theme]: {
            color: vars.colorRole.neutral.foreground,
            fontWeight: 500,
          },
        },
      }),
    },
    underline: style({
      '@layer': {
        [layers.theme]: {
          textDecoration: 'underline',
        },
      },
    }),
  },
  defaultVariants: {
    intent: 'primary',
  },
});
