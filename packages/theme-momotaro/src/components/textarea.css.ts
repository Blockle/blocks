import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const textarea: ThemeComponentsStyles['textarea'] = makeComponentTheme(
  'textarea',
  {
    input: style([
      atoms({
        paddingInline: 3,
        border: 'none',
        backgroundColor: 'transparent',
      }),
      {
        borderRadius: 'inherit',
        outline: 'none',
        color: vars.colorRole.text.default,
        '::placeholder': {
          color: vars.colorRole.text.muted,
        },
        ':disabled': {},
      },
    ]),
    root: style([
      {
        overflow: 'auto',
        minHeight: 96,
        maxHeight: 240,
        backgroundColor: vars.colorRole.surface.raised,
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `box-shadow ${vars.transition.fast}`,
          },
        },
      },
      atoms({
        paddingBlock: 2,
        borderRadius: 2,
        boxShadow: 2,
      }),
      focusable,
    ]),
  },
);
