import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

const startingTransform = createVar();
const drawerSize = createVar();

export const drawer: ThemeComponentsStyles['drawer'] = makeComponentTheme(
  'drawer',
  {
    root: style([
      atoms({
        border: 'none',
      }),
      {
        backgroundColor: vars.colorRole.surface.raised,
        color: vars.colorRole.text.default,
        selectors: {
          '&[open]': {
            transform: 'translate(0, 0)',
            opacity: 1,
            '@starting-style': {
              transform: startingTransform,
              opacity: 0,
            },
          },
          '&[open]::backdrop': {
            backgroundColor: vars.colorRole.overlay.default,
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
          height: drawerSize,
        }),
        right: style({
          vars: {
            [startingTransform]: 'translate(100%, 0)',
          },
          width: drawerSize,
        }),
        bottom: style({
          vars: {
            [startingTransform]: 'translate(0, 100%)',
          },
          height: drawerSize,
        }),
        left: style({
          vars: {
            [startingTransform]: 'translate(-100%, 0)',
          },
          width: drawerSize,
        }),
      },
      size: {
        small: style({
          vars: {
            [drawerSize]: 'min(300px, 100%)',
          },
        }),
        medium: style({
          vars: {
            [drawerSize]: 'min(480px, 100%)',
          },
        }),
        large: style({
          vars: {
            [drawerSize]: 'min(640px, 100%)',
          },
        }),
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);
