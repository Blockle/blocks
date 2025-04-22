import { atoms, makeComponentTheme } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

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
      '::backdrop': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      selectors: {
        '&[open]': {
          transform: 'translate(0, 0)',
          opacity: 1,
          // @ts-expect-error - Vanilla Extract does not support @starting-style (yet)
          '@starting-style': {
            transform: 'translate(0, -120px)',
            opacity: 0,
          },
        },
        '&[open]::backdrop': {
          opacity: 1,
          '@starting-style': {
            opacity: 0,
          },
        },
      },
      // Apply the animation only if the user has not requested reduced motion
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          // Ending style
          transform: 'translate(0, -120px)',
          opacity: 0,
          transitionBehavior: 'allow-discrete',
          transitionProperty: 'opacity, transform, overlay, display',
          transitionDuration: '240ms, 160ms, 240ms, 240ms',
          '::backdrop': {
            opacity: 0,
            transitionBehavior: 'allow-discrete',
            transitionProperty: 'opacity, overlay, display',
            transitionDuration: '160ms, 240ms, 240ms',
          },
        },
      },
    },
  ]),
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
