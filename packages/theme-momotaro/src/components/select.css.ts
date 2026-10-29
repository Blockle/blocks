import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

// Room the chevron takes at the end of the select: its padding, its 1rem
// width, and a gap before the value text
const chevronRoom = (padding: keyof typeof vars.space) =>
  `calc(${vars.space[padding]} + 1rem + ${vars.space[2]})`;

const small = style([
  atoms({
    paddingInlineStart: 3,
  }),
  {
    paddingInlineEnd: chevronRoom(3),
    minHeight: 40,
  },
]);

const medium = style([
  atoms({
    paddingInlineStart: 4,
  }),
  {
    paddingInlineEnd: chevronRoom(4),
    minHeight: 48,
  },
]);

const large = style([
  atoms({
    paddingInlineStart: 5,
  }),
  {
    paddingInlineEnd: chevronRoom(5),
    minHeight: 56,
  },
]);

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
        small,
        medium,
        large,
      },
    },
    // The chevron follows the select, so it lines up with each size's padding
    icon: style({
      selectors: {
        [`${small} + &`]: {
          paddingInline: vars.space[3],
        },
        [`${medium} + &`]: {
          paddingInline: vars.space[4],
        },
        [`${large} + &`]: {
          paddingInline: vars.space[5],
        },
      },
    }),
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
    },
  },
);
