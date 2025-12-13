import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

const startingTransform = createVar();

export const drawer: ThemeComponentsStyles['drawer'] = makeComponentTheme(
  'drawer',
  {
    root: style([
      atoms({
        border: 'none',
      }),
      {
        selectors: {
          '&[open]': {
            transform: 'translate(0, 0)',
            opacity: 1,
            // @ts-expect-error - typings does not support @starting-style (yet)
            '@starting-style': {
              transform: startingTransform,
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
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            // Ending style
            transform: startingTransform,
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
      placement: {
        top: style({
          vars: {
            [startingTransform]: 'translate(0, -100%)',
          },
        }),
        right: style({
          vars: {
            [startingTransform]: 'translate(100%, 0)',
          },
        }),
        bottom: style({
          vars: {
            [startingTransform]: 'translate(0, 100%)',
          },
        }),
        left: style({
          vars: {
            [startingTransform]: 'translate(-100%, 0)',
          },
        }),
      },
    },
  },
);
