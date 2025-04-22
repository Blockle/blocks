import { atoms, makeComponentTheme } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const popover = makeComponentTheme('popover', {
  base: style([
    atoms({
      backgroundColor: 'white',
      borderRadius: 'small',
      boxShadow: 'medium',
      padding: 'medium',
      margin: 'small', // Space between the popover and the anchor element
    }),
    {
      width: 'max-content',
      selectors: {
        '&[data-open]': {
          transform: 'scale(1)',
          opacity: 1,
        },
      },
      // Apply the animation only if the user has not requested reduced motion
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transform: 'scale(0.95)',
          transition: 'opacity 80ms linear, transform 80ms',
          opacity: 0,
        },
      },
    },
  ]),
});
