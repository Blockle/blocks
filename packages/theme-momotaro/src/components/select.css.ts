import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

// Room the chevron takes at the end of the select: its padding, its 1rem
// width, and a gap before the value text. The same at every size, so
// chevrons line up when selects of different sizes are stacked
const chevronRoom = `calc(${vars.space[3]} + 1rem + ${vars.space[2]})`;

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
            paddingInlineStart: 3,
          }),
          {
            paddingInlineEnd: chevronRoom,
            minHeight: 40,
          },
        ]),
        medium: style([
          atoms({
            paddingInlineStart: 4,
          }),
          {
            paddingInlineEnd: chevronRoom,
            minHeight: 48,
          },
        ]),
        large: style([
          atoms({
            paddingInlineStart: 5,
          }),
          {
            paddingInlineEnd: chevronRoom,
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
