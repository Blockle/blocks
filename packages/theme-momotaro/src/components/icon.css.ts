import {
  layers,
  makeComponentTheme,
  pixelsToRem,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const icon: ThemeComponentsStyles['icon'] = makeComponentTheme('icon', {
  root: '',
  variants: {
    size: {
      xsmall: style({
        '@layer': {
          [layers.theme]: {
            width: pixelsToRem(12),
          },
        },
      }),
      small: style({
        '@layer': {
          [layers.theme]: {
            width: pixelsToRem(16),
          },
        },
      }),
      medium: style({
        '@layer': {
          [layers.theme]: {
            width: pixelsToRem(32),
          },
        },
      }),
      large: style({
        '@layer': {
          [layers.theme]: {
            width: pixelsToRem(48),
          },
        },
      }),
      xlarge: style({
        '@layer': {
          [layers.theme]: {
            width: pixelsToRem(64),
          },
        },
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
