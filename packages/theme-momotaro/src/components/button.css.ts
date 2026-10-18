import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

import { clickable } from './helpers.css.js';

// Use css vars to share colors between variants
const intentColor = createVar();
const intentHoverColor = createVar();
const intentSubtleColor = createVar();
const onIntentColor = createVar();
const hoverBackgroundColor = createVar();

export const button: ThemeComponentsStyles['button'] = makeComponentTheme(
  'button',
  {
    root: style([
      atoms({
        display: 'inline-flex',
        placeItems: 'center',
        fontSize: 'medium',
        borderRadius: 2,
        fontWeight: 'medium',
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
          color: onIntentColor,
          backgroundColor: intentColor,
          border: 'none',
          vars: {
            [hoverBackgroundColor]: intentHoverColor,
          },
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
            vars: {
              [hoverBackgroundColor]: intentSubtleColor,
            },
          },
        ]),
        ghost: style({
          color: intentColor,
          background: 'transparent',
          vars: {
            [hoverBackgroundColor]: intentSubtleColor,
          },
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
            paddingInline: 5,
          }),
          {
            minHeight: 56,
          },
        ]),
      },
      intent: {
        neutral: style({
          vars: {
            [intentColor]: vars.color.neutral,
            [intentHoverColor]: vars.color.neutralHover,
            [intentSubtleColor]: vars.color.neutralSubtle,
            [onIntentColor]: vars.color.onNeutral,
          },
        }),
        primary: style({
          vars: {
            [intentColor]: vars.color.primary,
            [intentHoverColor]: vars.color.primaryHover,
            [intentSubtleColor]: vars.color.primarySubtle,
            [onIntentColor]: vars.color.onPrimary,
          },
        }),
        secondary: style({
          vars: {
            [intentColor]: vars.color.secondary,
            [intentHoverColor]: vars.color.secondaryHover,
            [intentSubtleColor]: vars.color.secondarySubtle,
            [onIntentColor]: vars.color.onSecondary,
          },
        }),
        success: style({
          vars: {
            [intentColor]: vars.color.success,
            [intentHoverColor]: vars.color.successHover,
            [intentSubtleColor]: vars.color.successSubtle,
            [onIntentColor]: vars.color.onSuccess,
          },
        }),
        danger: style({
          vars: {
            [intentColor]: vars.color.danger,
            [intentHoverColor]: vars.color.dangerHover,
            [intentSubtleColor]: vars.color.dangerSubtle,
            [onIntentColor]: vars.color.onDanger,
          },
        }),
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
      intent: 'primary',
    },
  },
);
