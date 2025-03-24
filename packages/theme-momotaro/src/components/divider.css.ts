import { makeComponentTheme } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const divider = makeComponentTheme('divider', {
  base: style({
    blockSize: 1,
  }),
  defaultVariants: {
    color: 'textLight',
  },
});
