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
        color: 'text-900',
        border: 'none',
        backgroundColor: 'transparent',
      }),
      {
        borderRadius: 'inherit',
        outline: 'none',
        '::placeholder': {
          color: vars.color['text-600'],
        },
        ':disabled': {},
      },
    ]),
    container: style([
      {
        overflow: 'auto',
        minHeight: 96,
        maxHeight: 240,
        backgroundColor: 'white',
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `box-shadow ${vars.transition.fast}`,
          },
        },
      },
      atoms({
        paddingBlock: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 2,
      }),
      focusable,
    ]),
  },
);
