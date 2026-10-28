import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const select: ThemeComponentsStyles['select'] = makeComponentTheme(
  'select',
  {
    select: style([
      atoms({
        paddingBlock: 1,
        borderRadius: 2,
        boxShadow: 2,
      }),
      {
        border: 'none',
        outline: 'none',
        color: vars.colorRole.text.default,
        backgroundColor: vars.colorRole.surface.raised,
        transitionDuration: vars.transition.fast,
        transitionProperty: 'outline-color, outline-offset',
      },
      focusable,
    ]),
    variants: {
      variant: {
        outline: style([
          atoms({
            borderWidth: 'thin',
          }),
          {
            borderStyle: 'solid',
            borderColor: vars.colorRole.primary.solid,
          },
        ]),
        solid: style({}),
      },
      size: {
        small: style([
          atoms({
            paddingInline: 3,
          }),
          {
            minHeight: 40,
          },
        ]),
        medium: style([
          atoms({
            paddingInline: 4,
          }),
          {
            minHeight: 48,
          },
        ]),
        large: style([
          atoms({
            paddingInline: 5,
          }),
          {
            minHeight: 56,
          },
        ]),
      },
    },
    icon: atoms({
      paddingInline: 3,
    }),
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
    },
  },
);
