import { style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';

export const dialog = makeComponentTheme('dialog', {
  base: style([
    atoms({
      display: 'flex',
      flexDirection: 'column',
      padding: 'gutter',
      border: 'none',
      overflow: 'auto',
      borderRadius: 'medium',
      boxShadow: 'large',
    }),
    {
      minWidth: '300px',
    },
  ]),
  backdrop: style({
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }),
  variants: {
    size: {
      small: style({
        width: '400px',
        maxWidth: 'min(400px, 90vw)',
      }),
      medium: style({
        width: '600px',
        maxWidth: 'min(600px, 90vw)',
      }),
      large: style({
        width: '800px',
        maxWidth: 'min(800px, 90vw)',
      }),
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
