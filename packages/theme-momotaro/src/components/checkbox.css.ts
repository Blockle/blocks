import {
  layers,
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
        '@layer': {
          [layers.theme]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            inlineSize: 24,
            blockSize: 24,
            borderRadius: vars.borderRadius[1],
            backgroundColor: vars.colorRole.primary.subtle,
            '@media': {
              '(prefers-reduced-motion: no-preference)': {
                transition: `background-color ${vars.transition.normal}, box-shadow ${vars.transition.fast}`,
              },
            },
            selectors: {
              '&:hover:not(:has(input:disabled))': {
                backgroundColor: vars.colorRole.primary.solidHover,
              },
              '&:has(input:checked)': {
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
          inlineSize: '1rem',
          blockSize: '1rem',
          color: vars.colorRole.primary.contrast,
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
