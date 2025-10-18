import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const input: ThemeComponentsStyles['input'] = makeComponentTheme(
  'input',
  {
    input: style([
      atoms({
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
        minHeight: 40,
        backgroundColor: 'white',
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `box-shadow ${vars.transition.fast}`,
          },
        },
      },
      atoms({
        paddingInline: 3,
        paddingBlock: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 'medium',
      }),
      focusable,
    ]),
  },
);
