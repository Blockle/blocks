import {
  layers,
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
      '@layer': {
        [layers.theme]: {
          blockSize: '20px',
        },
      },
    }),
    track: style({
      '@layer': {
        [layers.theme]: {
          borderRadius: vars.borderRadius[1],
          blockSize: '4px',
          backgroundColor: trackBackground,
        },
      },
    }),
    filledTrack: style({
      '@layer': {
        [layers.theme]: {
          backgroundColor: filledTrackBackground,
        },
      },
    }),
    thumb: style([
      {
        '@layer': {
          [layers.theme]: {
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
        },
      },
      focusable,
    ]),
    variants: {
      size: {
        small: style({
          '@layer': {
            [layers.theme]: {
              inlineSize: '100px',
            },
          },
        }),
        medium: style({
          '@layer': {
            [layers.theme]: {
              inlineSize: '200px',
            },
          },
        }),
        large: style({
          '@layer': {
            [layers.theme]: {
              inlineSize: '300px',
            },
          },
        }),
      },
      intent: {
        primary: style({
          '@layer': {
            [layers.theme]: {
              vars: {
                [trackBackground]: vars.colorRole.primary.subtle,
                [filledTrackBackground]: vars.colorRole.primary.solid,
                [thumbBackground]: vars.colorRole.primary.solid,
                [haloColor]: vars.colorRole.primary.subtle,
              },
            },
          },
        }),
        secondary: style({
          '@layer': {
            [layers.theme]: {
              vars: {
                [trackBackground]: vars.colorRole.secondary.subtle,
                [filledTrackBackground]: vars.colorRole.secondary.solid,
                [thumbBackground]: vars.colorRole.secondary.solid,
                [haloColor]: vars.colorRole.secondary.subtle,
              },
            },
          },
        }),
      },
      disabled: style({
        '@layer': {
          [layers.theme]: {
            pointerEvents: 'none',
            vars: {
              [trackBackground]: vars.colorRole.border.default,
              [filledTrackBackground]: vars.colorRole.text.disabled,
              [thumbBackground]: vars.colorRole.text.disabled,
            },
          },
        },
      }),
    },
    defaultVariants: {
      size: 'medium',
      intent: 'primary',
    },
  },
);
