import {
  type ThemeComponentsStyles,
  makeComponentTheme,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const divider: ThemeComponentsStyles['divider'] = makeComponentTheme(
  'divider',
  {
    base: style({
      blockSize: 1,
    }),
    defaultVariants: {
      color: 'text-500',
    },
  },
);
