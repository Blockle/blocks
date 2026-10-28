import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

const { surface, text } = vars.colorRole;

export const tooltip: ThemeComponentsStyles['tooltip'] = makeComponentTheme(
  'tooltip',
  {
    root: atoms({
      padding: 1,
    }),
    variants: {
      intent: {
        // Inverse of the page: dark on light, light on dark
        primary: style({
          backgroundColor: `color-mix(in srgb, ${surface.inverse} 80%, transparent)`,
          boxShadow: `0 0 0 1px color-mix(in srgb, ${text.inverse} 10%, transparent)`,
          color: text.inverse,
        }),
        // Same as the page
        secondary: style({
          backgroundColor: `color-mix(in srgb, ${surface.default} 80%, transparent)`,
          boxShadow: `0 0 0 1px color-mix(in srgb, ${text.default} 10%, transparent)`,
          color: text.default,
        }),
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);
