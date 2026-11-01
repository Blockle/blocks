import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const popover: ThemeComponentsStyles['popover'] = makeComponentTheme(
  'popover',
  {
    root: style({
      '@layer': {
        [layers.theme]: {
          borderRadius: vars.borderRadius[1],
          boxShadow: vars.colorRole.shadow[2],
          padding: vars.space[2],
          margin: vars.space[1], // Space between the popover and the anchor element
          backgroundColor: vars.colorRole.surface.raised,
          color: vars.colorRole.text.default,
          width: 'max-content',
          selectors: {
            '&:popover-open': {
              transform: 'translateY(0) scale(1)',
              opacity: 1,
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
      },
    }),
  },
);
