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
        backgroundColor: vars.color.surfaceRaised,
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
        backgroundColor: 'surfaceRaised',
        borderRadius: 2,
        boxShadow: 2,
        // Space between `startSlot | children | endSlot`
        gap: 2,
      }),
      focusable,
    ]),
    input: style([
      atoms({
        color: 'text',
        border: 'none',
        backgroundColor: 'transparent',
      }),
      {
        outline: 'none',
        '::placeholder': {
          color: vars.color.textMuted,
        },
        ':disabled': {},
      },
    ]),
  },
);
