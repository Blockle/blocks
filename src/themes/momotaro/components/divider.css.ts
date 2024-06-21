import { style } from '@vanilla-extract/css';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';

export const divider = makeComponentTheme('divider', {
  base: style({
    blockSize: 1,
  }),
  defaultVariants: {
    color: 'textLight',
  },
});
