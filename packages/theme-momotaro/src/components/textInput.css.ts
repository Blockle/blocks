import {
  atoms,
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
        minHeight: 40,
        backgroundColor: vars.colorRole.surface.raised,
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `box-shadow ${vars.transition.fast}`,
          },
        },
      },
      atoms({
        display: 'flex',
        paddingInline: 3,
        paddingBlock: 2,
        borderRadius: 2,
        boxShadow: 2,
        // Space between `startSlot | children | endSlot`
        gap: 2,
      }),
      focusable,
    ]),
    input: style([
      atoms({
        border: 'none',
        backgroundColor: 'transparent',
      }),
      {
        outline: 'none',
        color: vars.colorRole.text.default,
        '::placeholder': {
          color: vars.colorRole.text.muted,
        },
        ':disabled': {},
      },
    ]),
  },
);
