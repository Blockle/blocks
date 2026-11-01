import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const label: ThemeComponentsStyles['label'] = makeComponentTheme(
  'label',
  {
    root: style({
      '@layer': {
        [layers.theme]: {
          letterSpacing: vars.letterSpacing.wide,
        },
      },
    }),
    variants: {
      size: {
        small: style({
          '@layer': {
            [layers.theme]: {
              fontSize: vars.fontSize.xsmall,
            },
          },
        }),
        medium: style({
          '@layer': {
            [layers.theme]: {
              fontSize: vars.fontSize.small,
            },
          },
        }),
        large: style({
          '@layer': {
            [layers.theme]: {
              fontSize: vars.fontSize.medium,
            },
          },
        }),
      },
      required: style({
        '@layer': {
          [layers.theme]: {
            ':after': {
              content: '"*"',
              marginLeft: vars.space[1],
            },
          },
        },
      }),
    },
    defaultVariants: {
      size: 'large',
    },
  },
);
