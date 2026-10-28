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
const haloColor = createVar();

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
        boxShadow: `0 0 0 0px color-mix(in srgb,  ${haloColor}, transparent 0%)`,
        vars: {
          [thumbActive]: `0 0 0 8px color-mix(in srgb,  ${haloColor}, transparent 20%)`,
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
            [trackBackground]: vars.colorRole.intentPrimary.subtle,
            [filledTrackBackground]: vars.colorRole.intentPrimary.solid,
            [thumbBackground]: vars.colorRole.intentPrimary.solid,
            [haloColor]: vars.colorRole.intentPrimary.subtle,
          },
        }),
        secondary: style({
          vars: {
            [trackBackground]: vars.colorRole.intentSecondary.subtle,
            [filledTrackBackground]: vars.colorRole.intentSecondary.solid,
            [thumbBackground]: vars.colorRole.intentSecondary.solid,
            [haloColor]: vars.colorRole.intentSecondary.subtle,
          },
        }),
      },
      disabled: style({
        pointerEvents: 'none',
        vars: {
          [trackBackground]: vars.colorRole.border.default,
          [filledTrackBackground]: vars.colorRole.text.disabled,
          [thumbBackground]: vars.colorRole.text.disabled,
        },
      }),
    },
    defaultVariants: {
      size: 'medium',
      intent: 'primary',
    },
  },
);
