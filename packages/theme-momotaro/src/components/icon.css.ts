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
        minWidth: pixelsToRem(12),
      }),
      small: style({
        minWidth: pixelsToRem(16),
      }),
      medium: style({
        minWidth: pixelsToRem(32),
      }),
      large: style({
        minWidth: pixelsToRem(48),
      }),
      xlarge: style({
        minWidth: pixelsToRem(64),
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
