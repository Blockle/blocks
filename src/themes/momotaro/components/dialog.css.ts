import { style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';

export const dialog = makeComponentTheme('dialog', {
  dialog: style([
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
      maxHeight: '90%',
      minWidth: '300px',
      selectors: {
        '&[data-open]': {
          transform: 'scale(1)',
        },
      },
      // Apply the animation only if the user has not requested reduced motion
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transform: 'scale(0.9)',
          transition: 'transform 160ms',
        },
      },
    },
  ]),
  backdrop: style({
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    selectors: {
      '&[data-open]': {
        opacity: 1,
      },
    },
    // Apply the animation only if the user has not requested reduced motion
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        opacity: 0,
        transition: 'opacity 160ms',
      },
    },
  }),
  variants: {
    size: {
      small: style({
        width: '400px',
        maxWidth: 'min(400px, 90%)',
      }),
      medium: style({
        width: '600px',
        maxWidth: 'min(600px, 90%)',
      }),
      large: style({
        width: '800px',
        maxWidth: 'min(800px, 90%)',
      }),
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
