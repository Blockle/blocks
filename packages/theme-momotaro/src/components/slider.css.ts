import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

const trackBackground = createVar();
const filledTrackBackground = createVar();
const thumbBackground = createVar();
const thumbActive = createVar();

export const slider: ThemeComponentsStyles['slider'] = makeComponentTheme(
  'slider',
  {
    root: style({
      blockSize: '20px',
    }),
    track: style([
      atoms({
        borderRadius: 1,
      }),
      {
        blockSize: '4px',
        backgroundColor: trackBackground,
      },
    ]),
    filledTrack: style({
      backgroundColor: filledTrackBackground,
    }),
    thumb: style([
      {
        backgroundColor: thumbBackground,
        borderRadius: '50%',
        height: '16px',
        width: '16px',
        boxShadow: `0 0 0 0px color-mix(in srgb,  ${vars.color.primarySubtle}, transparent 0%)`,
        vars: {
          [thumbActive]: `0 0 0 8px color-mix(in srgb,  ${vars.color.primarySubtle}, transparent 20%)`,
        },
        ':hover': {
          boxShadow: thumbActive,
        },
        ':focus-visible': {
          boxShadow: thumbActive,
        },
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: 'box-shadow 0.2s',
          },
        },
      },
      focusable,
    ]),
    variants: {
      size: {
        small: style({
          inlineSize: '100px',
        }),
        medium: style({
          inlineSize: '200px',
        }),
        large: style({
          inlineSize: '300px',
        }),
      },
      intent: {
        primary: style({
          vars: {
            [trackBackground]: vars.color.primarySubtle,
            [filledTrackBackground]: vars.color.primary,
            [thumbBackground]: vars.color.primary,
          },
        }),
        secondary: style({
          vars: {
            [trackBackground]: vars.color.primarySubtle,
            [filledTrackBackground]: vars.color.secondary,
            [thumbBackground]: vars.color.secondary,
          },
        }),
      },
      disabled: style({
        pointerEvents: 'none',
        vars: {
          [trackBackground]: vars.color.surfaceSunken,
          [filledTrackBackground]: vars.color.textDisabled,
          [thumbBackground]: vars.color.textDisabled,
        },
      }),
    },
    defaultVariants: {
      size: 'medium',
      intent: 'primary',
    },
  },
);
