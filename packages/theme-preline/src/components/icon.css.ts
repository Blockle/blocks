import {
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const icon: ThemeComponentsStyles['icon'] = makeComponentTheme('icon', {
  base: '',
  variants: {
    size: {
      small: style({
        minWidth: '1rem',
      }),
      medium: style({
        minWidth: '2rem',
      }),
      large: style({
        minWidth: '3rem',
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
