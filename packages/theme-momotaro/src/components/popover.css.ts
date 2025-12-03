import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const popover: ThemeComponentsStyles['popover'] = makeComponentTheme(
  'popover',
  {
    base: style([
      atoms({
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 2,
        padding: 2,
        margin: 1, // Space between the popover and the anchor element
      }),
      {
        width: 'max-content',
        selectors: {
          '&:popover-open': {
            transform: 'translateY(0) scale(1)',
            opacity: 1,
            // @ts-expect-error - Vanilla Extract does not support @starting-style (yet)
            '@starting-style': {
              transform: 'translateY(12px) scale(0.8)',
              opacity: 0,
            },
          },
        },
        // Apply the animation only if the user has not requested reduced motion
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            // Ending style
            transform: 'translateY(12px) scale(0.8)',
            opacity: 0,
            transitionBehavior: 'allow-discrete',
            transitionProperty: 'opacity, transform, overlay, display',
            transitionDuration: '100ms',
          },
        },
      },
    ]),
  },
);
