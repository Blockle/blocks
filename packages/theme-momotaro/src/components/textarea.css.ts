import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const textarea: ThemeComponentsStyles['textarea'] = makeComponentTheme(
  'textarea',
  {
    input: style({
      '@layer': {
        [layers.theme]: {
          paddingInline: vars.space[3],
          border: 'none',
          backgroundColor: 'transparent',
          borderRadius: 'inherit',
          outline: 'none',
          color: vars.colorRole.text.default,
          '::placeholder': {
            color: vars.colorRole.text.muted,
          },
          ':disabled': {},
        },
      },
    }),
    root: style([
      {
        '@layer': {
          [layers.theme]: {
            overflow: 'auto',
            minHeight: 96,
            maxHeight: 240,
            backgroundColor: vars.colorRole.surface.raised,
            paddingBlock: vars.space[2],
            borderRadius: vars.borderRadius[2],
            boxShadow: vars.colorRole.shadow[2],
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
  },
);
