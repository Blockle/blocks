import {
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { createVar, fallbackVar, style } from '@vanilla-extract/css';

const sizeVar = createVar();

export const divider: ThemeComponentsStyles['divider'] = makeComponentTheme(
  'divider',
  {
    root: style({
      ':before': {
        blockSize: fallbackVar(sizeVar, '1px'),
      },
      ':after': {
        blockSize: fallbackVar(sizeVar, '1px'),
      },
    }),
    variants: {
      size: {
        1: style({
          vars: {
            [sizeVar]: '1px',
          },
        }),
        2: style({
          vars: {
            [sizeVar]: '2px',
          },
        }),
        3: style({
          vars: {
            [sizeVar]: '3px',
          },
        }),
      },
    },
  },
);
