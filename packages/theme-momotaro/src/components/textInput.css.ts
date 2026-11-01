import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const textInput: ThemeComponentsStyles['textInput'] = makeComponentTheme(
  'textInput',
  {
    root: style([
      {
        '@layer': {
          [layers.theme]: {
            minHeight: 40,
            backgroundColor: vars.colorRole.surface.raised,
            display: 'flex',
            paddingInline: vars.space[3],
            paddingBlock: vars.space[2],
            borderRadius: vars.borderRadius[2],
            boxShadow: vars.colorRole.shadow[2],
            // Space between `startSlot | children | endSlot`
            gap: vars.space[2],
            '@media': {
              '(prefers-reduced-motion: no-preference)': {
                transition: `box-shadow ${vars.transition.fast}`,
              },
            },
          },
        },
      },
      focusable,
    ]),
    input: style({
      '@layer': {
        [layers.theme]: {
          border: 'none',
          backgroundColor: 'transparent',
          outline: 'none',
          color: vars.colorRole.text.default,
          '::placeholder': {
            color: vars.colorRole.text.muted,
          },
          ':disabled': {},
        },
      },
    }),
  },
);
