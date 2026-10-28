import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

import { clickable } from './helpers.css.js';

// Use css vars to share colors between variants
const solidColor = createVar();
const solidHoverColor = createVar();
const subtleColor = createVar();
const contrastColor = createVar();

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
        selectors: {},
      },
      clickable,
    ]),
    variants: {
      variant: {
        solid: style({
          color: contrastColor,
          backgroundColor: solidColor,
          border: 'none',
          selectors: {
            '&:hover:not(:disabled)': {
              backgroundColor: solidHoverColor,
            },
          },
        }),
        outline: style([
          atoms({
            borderWidth: 'thin',
          }),
          {
            color: solidColor,
            borderStyle: 'solid',
            borderColor: solidColor,
            background: 'transparent',
            selectors: {
              '&:hover:not(:disabled)': {
                backgroundColor: subtleColor,
              },
            },
          },
        ]),
        ghost: style({
          color: solidColor,
          background: 'transparent',
          selectors: {
            '&:hover:not(:disabled)': {
              backgroundColor: subtleColor,
            },
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
            [solidColor]: vars.colorRole.neutral.solid,
            [solidHoverColor]: vars.colorRole.neutral.solidHover,
            [subtleColor]: vars.colorRole.neutral.subtle,
            [contrastColor]: vars.colorRole.neutral.contrast,
          },
        }),
        primary: style({
          vars: {
            [solidColor]: vars.colorRole.primary.solid,
            [solidHoverColor]: vars.colorRole.primary.solidHover,
            [subtleColor]: vars.colorRole.primary.subtle,
            [contrastColor]: vars.colorRole.primary.contrast,
          },
        }),
        secondary: style({
          vars: {
            [solidColor]: vars.colorRole.secondary.solid,
            [solidHoverColor]: vars.colorRole.secondary.solidHover,
            [subtleColor]: vars.colorRole.secondary.subtle,
            [contrastColor]: vars.colorRole.secondary.contrast,
          },
        }),
        success: style({
          vars: {
            [solidColor]: vars.colorRole.success.solid,
            [solidHoverColor]: vars.colorRole.success.solidHover,
            [subtleColor]: vars.colorRole.success.subtle,
            [contrastColor]: vars.colorRole.success.contrast,
          },
        }),
        danger: style({
          vars: {
            [solidColor]: vars.colorRole.danger.solid,
            [solidHoverColor]: vars.colorRole.danger.solidHover,
            [subtleColor]: vars.colorRole.danger.subtle,
            [contrastColor]: vars.colorRole.danger.contrast,
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
