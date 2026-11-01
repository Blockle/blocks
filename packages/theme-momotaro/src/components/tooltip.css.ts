import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

const { surface, text } = vars.colorRole;

export const tooltip: ThemeComponentsStyles['tooltip'] = makeComponentTheme(
  'tooltip',
  {
    // No styles of its own: it sits on the popover surface, which sets the padding
    root: '',
    variants: {
      intent: {
        // Inverse of the page: dark on light, light on dark
        primary: style({
          '@layer': {
            [layers.theme]: {
              backgroundColor: `color-mix(in srgb, ${surface.inverse} 80%, transparent)`,
              boxShadow: `0 0 0 1px color-mix(in srgb, ${text.inverse} 10%, transparent)`,
              color: text.inverse,
            },
          },
        }),
        // Same as the page
        secondary: style({
          '@layer': {
            [layers.theme]: {
              backgroundColor: `color-mix(in srgb, ${surface.default} 80%, transparent)`,
              boxShadow: `0 0 0 1px color-mix(in srgb, ${text.default} 10%, transparent)`,
              color: text.default,
            },
          },
        }),
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);
