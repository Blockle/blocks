import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

// The inverse roles make the tooltip dark on light and light on dark.
export const tooltip: ThemeComponentsStyles['tooltip'] = makeComponentTheme(
  'tooltip',
  {
    root: style([
      atoms({
        padding: 1,
      }),
      {
        backgroundColor: vars.color.surfaceInverse,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.textInverse} 10%, transparent)`,
        color: vars.color.textInverse,
      },
    ]),
  },
);
