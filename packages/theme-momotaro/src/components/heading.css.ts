import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const heading: ThemeComponentsStyles['heading'] = makeComponentTheme(
  'heading',
  {
    variants: {
      color: {
        default: style({
          '@layer': { [layers.theme]: { color: vars.colorRole.text.default } },
        }),
        muted: style({
          '@layer': { [layers.theme]: { color: vars.colorRole.text.muted } },
        }),
        disabled: style({
          '@layer': { [layers.theme]: { color: vars.colorRole.text.disabled } },
        }),
        inverse: style({
          '@layer': { [layers.theme]: { color: vars.colorRole.text.inverse } },
        }),
      },
    },
    defaultVariants: {
      color: 'default',
    },
  },
);
