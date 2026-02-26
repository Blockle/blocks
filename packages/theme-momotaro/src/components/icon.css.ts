import {
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
        width: pixelsToRem(12),
      }),
      small: style({
        width: pixelsToRem(16),
      }),
      medium: style({
        width: pixelsToRem(32),
      }),
      large: style({
        width: pixelsToRem(48),
      }),
      xlarge: style({
        width: pixelsToRem(64),
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
