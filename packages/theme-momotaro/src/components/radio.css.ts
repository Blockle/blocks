import {
  type ThemeComponentsStyles,
  atoms,
  makeComponentTheme,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';
import { focusable } from './helpers.css.js';
import { bounceOut } from './transitions.js';

export const radio: ThemeComponentsStyles['radio'] = makeComponentTheme(
  'radio',
  {
    base: style([
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
          backgroundColor: vars.color['primary-700'],
        },
        selectors: {
          '&:has(input:checked):not(:hover)': {
            backgroundColor: vars.color['primary-500'],
          },
        },
      },
      atoms({
        backgroundColor: 'primary-100',
      }),
      focusable,
    ]),
    icon: style({
      height: 12,
      width: 12,
      backgroundColor: 'white',
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
