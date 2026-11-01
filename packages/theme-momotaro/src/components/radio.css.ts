import {
  layers,
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
        '@layer': {
          [layers.theme]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            inlineSize: 24,
            blockSize: 24,
            borderRadius: 12,
            backgroundColor: vars.colorRole.primary.subtle,
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
        },
      },
      focusable,
    ]),
    icon: style({
      '@layer': {
        [layers.theme]: {
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
        },
      },
    }),
    label: style({
      '@layer': {
        [layers.theme]: {
          display: 'flex',
          flexDirection: 'row',
          padding: vars.space[1],
          gap: vars.space[2],
          cursor: 'pointer',
        },
      },
    }),
  },
);
