import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';
import { bounceOut } from './transitions.js';

export const checkbox: ThemeComponentsStyles['checkbox'] = makeComponentTheme(
  'checkbox',
  {
    root: style([
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inlineSize: 24,
        blockSize: 24,
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `background-color ${vars.transition.normal}, box-shadow ${vars.transition.fast}`,
          },
        },
        selectors: {
          '&:hover:not(:has(input:disabled))': {
            backgroundColor: vars.colorRole.intentPrimary.solidHover,
          },
          '&:has(input:checked)': {
            backgroundColor: vars.colorRole.intentPrimary.solid,
          },
        },
      },
      atoms({
        borderRadius: 1,
      }),
      { backgroundColor: vars.colorRole.intentPrimary.subtle },
      focusable,
    ]),
    icon: style({
      inlineSize: '1rem',
      blockSize: '1rem',
      color: vars.colorRole.intentPrimary.contrast,
      transform: 'scale(0)',
      selectors: {
        'input:checked ~ &': {
          transform: 'scale(1)',
        },
      },
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: `transform ${vars.transition.normal} ${bounceOut}`,
        },
      },
    }),
    label: atoms({
      display: 'flex',
      flexDirection: 'row',
      padding: 1,
      gap: 2,
      cursor: 'pointer',
    }),
  },
);
