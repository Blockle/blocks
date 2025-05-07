import { atoms, makeComponentTheme } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const tooltip = makeComponentTheme('tooltip', {
  base: atoms({
    padding: 'small',
  }),
  variants: {
    colorScheme: {
      primary: style({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
        color: 'white',
      }),
      secondary: style({
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
        color: 'black',
      }),
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
  },
});
