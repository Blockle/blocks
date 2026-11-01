import {
  layers,
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
      {
        '@layer': {
          [layers.theme]: {
            paddingBlock: vars.space[1],
            borderRadius: vars.borderRadius[2],
            boxShadow: vars.colorRole.shadow[2],
            border: 'none',
            outline: 'none',
            color: vars.colorRole.text.default,
            backgroundColor: vars.colorRole.surface.raised,
            transitionDuration: vars.transition.fast,
            transitionProperty: 'outline-color, outline-offset',
          },
        },
      },
      focusable,
    ]),
    variants: {
      variant: {
        outline: style({
          '@layer': {
            [layers.theme]: {
              borderWidth: vars.borderWidth.thin,
              borderStyle: 'solid',
              borderColor: vars.colorRole.primary.solid,
            },
          },
        }),
        solid: '',
      },
      size: {
        small: style({
          '@layer': {
            [layers.theme]: {
              paddingInlineStart: vars.space[3],
              paddingInlineEnd: chevronRoom,
              minHeight: 40,
            },
          },
        }),
        medium: style({
          '@layer': {
            [layers.theme]: {
              paddingInlineStart: vars.space[4],
              paddingInlineEnd: chevronRoom,
              minHeight: 48,
            },
          },
        }),
        large: style({
          '@layer': {
            [layers.theme]: {
              paddingInlineStart: vars.space[5],
              paddingInlineEnd: chevronRoom,
              minHeight: 56,
            },
          },
        }),
      },
    },
    icon: style({
      '@layer': {
        [layers.theme]: {
          paddingInline: vars.space[3],
        },
      },
    }),
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
    },
  },
);
