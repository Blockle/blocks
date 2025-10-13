import {
  type ThemeComponentsStyles,
  atoms,
  makeComponentTheme,
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
    base: style({
      blockSize: '20px',
    }),
    track: style([
      atoms({
        borderRadius: 'small',
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
        boxShadow: `0 0 0 0px color-mix(in srgb,  ${vars.color['primary-100']}, transparent 0%)`,
        vars: {
          [thumbActive]: `0 0 0 8px color-mix(in srgb,  ${vars.color['primary-100']}, transparent 20%)`,
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
      colorScheme: {
        primary: style({
          vars: {
            [trackBackground]: vars.color['primary-100'],
            [filledTrackBackground]: vars.color['primary-500'],
            [thumbBackground]: vars.color['primary-500'],
          },
        }),
        secondary: style({
          vars: {
            [trackBackground]: vars.color['primary-100'],
            [filledTrackBackground]: vars.color['secondary-500'],
            [thumbBackground]: vars.color['secondary-500'],
          },
        }),
      },
      disabled: style({
        pointerEvents: 'none',
        vars: {
          [trackBackground]: vars.color['background-200'],
          [filledTrackBackground]: vars.color['background-400'],
          [thumbBackground]: vars.color['background-400'],
        },
      }),
    },
    defaultVariants: {
      size: 'medium',
      colorScheme: 'primary',
    },
  },
);
