import {
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const divider: ThemeComponentsStyles['divider'] = makeComponentTheme(
  'divider',
  {
    root: style({
      blockSize: 1,
    }),
    defaultVariants: {
      color: 'text-500',
    },
  },
);
