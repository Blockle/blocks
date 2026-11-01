import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { createVar, fallbackVar, style } from '@vanilla-extract/css';

const sizeVar = createVar();

export const divider: ThemeComponentsStyles['divider'] = makeComponentTheme(
  'divider',
  {
    root: style({
      '@layer': {
        [layers.theme]: {
          ':before': {
            blockSize: fallbackVar(sizeVar, '1px'),
          },
          ':after': {
            blockSize: fallbackVar(sizeVar, '1px'),
          },
        },
      },
    }),
    variants: {
      size: {
        1: style({
          '@layer': {
            [layers.theme]: {
              vars: {
                [sizeVar]: '1px',
              },
            },
          },
        }),
        2: style({
          '@layer': {
            [layers.theme]: {
              vars: {
                [sizeVar]: '2px',
              },
            },
          },
        }),
        3: style({
          '@layer': {
            [layers.theme]: {
              vars: {
                [sizeVar]: '3px',
              },
            },
          },
        }),
      },
    },
  },
);
