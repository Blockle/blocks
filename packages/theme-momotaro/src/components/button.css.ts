import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

import { clickable, focusRingColor } from './helpers.css.js';

// Use css vars to share colors between variants
const intentColor = createVar();
const hoverBackgroundColor = createVar();

export const button: ThemeComponentsStyles['button'] = makeComponentTheme(
  'button',
  {
    base: style([
      atoms({
        display: 'inline-flex',
        placeItems: 'center',
        fontSize: 'medium',
        borderRadius: 2,
        fontWeight: 'medium',
        // Space between `startSlot | children | endSlot`
        gap: 2,
        paddingBlock: 1,
      }),
      {
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: hoverBackgroundColor,
          },
        },
      },
      clickable,
    ]),
    variants: {
      variant: {
        solid: style({
          color: vars.color.white,
          backgroundColor: intentColor,
          border: 'none',
        }),
        outline: style([
          atoms({
            borderWidth: 'thin',
          }),
          {
            color: intentColor,
            borderStyle: 'solid',
            borderColor: intentColor,
            background: 'transparent',
          },
        ]),
        ghost: style({
          color: intentColor,
          background: 'transparent',
        }),
      },
      size: {
        small: style([
          atoms({
            paddingInline: 3,
          }),
          {
            minHeight: 40,
          },
        ]),
        medium: style([
          atoms({
            paddingInline: 4,
          }),
          {
            minHeight: 48,
          },
        ]),
        large: style([
          atoms({
            paddingInline: 4,
          }),
          {
            minHeight: 56,
          },
        ]),
      },
      intent: {
        neutral: style({
          vars: {
            [intentColor]: vars.color['primary-500'],
            [hoverBackgroundColor]: vars.color['primary-100'],
          },
        }),
        danger: style({
          vars: {
            [intentColor]: vars.color['danger-700'],
            [hoverBackgroundColor]: vars.color['danger-200'],
            [focusRingColor]: vars.color['danger-300'],
          },
        }),
      },
    },
    compoundVariants: [
      {
        variants: {
          variant: 'solid',
          intent: 'neutral',
        },
        style: style({
          vars: {
            [hoverBackgroundColor]: vars.color['primary-700'],
          },
        }),
      },
      {
        variants: {
          variant: 'solid',
          intent: 'danger',
        },
        style: style({
          vars: {
            [hoverBackgroundColor]: vars.color['danger-200'],
          },
        }),
      },
    ],
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
      intent: 'neutral',
    },
  },
);
