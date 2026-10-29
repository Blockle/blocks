import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { createVar, keyframes, style } from '@vanilla-extract/css';

// Where a toast slides in from, away from the screen edge it sits against
const enterTranslate = createVar();

const toastEnter = keyframes({
  from: { opacity: 0, scale: 0.9, translate: enterTranslate },
  to: { opacity: 1, scale: 1, translate: '0 0' },
});

const top = style({
  vars: {
    [enterTranslate]: '0 -20%',
  },
});

const bottom = style({
  vars: {
    [enterTranslate]: '0 20%',
  },
});

export const toast: ThemeComponentsStyles['toast'] = makeComponentTheme(
  'toast',
  {
    root: style([
      atoms({
        gap: 2,
        padding: 2,
      }),
      {
        maxWidth: 'min(100%, 400px)',
      },
    ]),
    toast: style([
      atoms({
        boxShadow: 3,
      }),
      {
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            animationName: toastEnter,
            animationDuration: '240ms',
            animationTimingFunction: 'ease-out',
          },
        },
      },
    ]),
    variants: {
      placement: {
        top,
        'top-start': top,
        'top-end': top,
        bottom,
        'bottom-start': bottom,
        'bottom-end': bottom,
      },
    },
  },
);
