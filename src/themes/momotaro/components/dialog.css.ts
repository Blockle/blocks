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
      minInlineSize: '300px',
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
        inlineSize: '400px',
        maxInlineSize: 'min(400px, 90vw)',
      }),
      medium: style({
        inlineSize: '600px',
        maxInlineSize: 'min(600px, 90vw)',
      }),
      large: style({
        inlineSize: '800px',
        maxInlineSize: 'min(800px, 90vw)',
      }),
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
