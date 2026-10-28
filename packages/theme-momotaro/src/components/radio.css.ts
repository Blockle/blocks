import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';
import { bounceOut } from './transitions.js';

export const radio: ThemeComponentsStyles['radio'] = makeComponentTheme(
  'radio',
  {
    root: style([
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inlineSize: 24,
        blockSize: 24,
        borderRadius: 12,
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `background-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
          },
        },
        ':hover': {
          backgroundColor: vars.colorRole.primary.solidHover,
        },
        selectors: {
          '&:has(input:checked):not(:hover)': {
            backgroundColor: vars.colorRole.primary.solid,
          },
        },
      },
      { backgroundColor: vars.colorRole.primary.subtle },
      focusable,
    ]),
    icon: style({
      height: 12,
      width: 12,
      backgroundColor: vars.colorRole.primary.contrast,
      borderRadius: '8px',
      transform: 'scale(0)',
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: `transform ${vars.transition.normal} ${bounceOut}`,
        },
      },
      selectors: {
        'input:checked ~ &': {
          transform: 'scale(1)',
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
