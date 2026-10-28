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
            [solidColor]: vars.colorRole.intentNeutral.solid,
            [solidHoverColor]: vars.colorRole.intentNeutral.solidHover,
            [subtleColor]: vars.colorRole.intentNeutral.subtle,
            [contrastColor]: vars.colorRole.intentNeutral.contrast,
          },
        }),
        primary: style({
          vars: {
            [solidColor]: vars.colorRole.intentPrimary.solid,
            [solidHoverColor]: vars.colorRole.intentPrimary.solidHover,
            [subtleColor]: vars.colorRole.intentPrimary.subtle,
            [contrastColor]: vars.colorRole.intentPrimary.contrast,
          },
        }),
        secondary: style({
          vars: {
            [solidColor]: vars.colorRole.intentSecondary.solid,
            [solidHoverColor]: vars.colorRole.intentSecondary.solidHover,
            [subtleColor]: vars.colorRole.intentSecondary.subtle,
            [contrastColor]: vars.colorRole.intentSecondary.contrast,
          },
        }),
        success: style({
          vars: {
            [solidColor]: vars.colorRole.intentSuccess.solid,
            [solidHoverColor]: vars.colorRole.intentSuccess.solidHover,
            [subtleColor]: vars.colorRole.intentSuccess.subtle,
            [contrastColor]: vars.colorRole.intentSuccess.contrast,
          },
        }),
        danger: style({
          vars: {
            [solidColor]: vars.colorRole.intentDanger.solid,
            [solidHoverColor]: vars.colorRole.intentDanger.solidHover,
            [subtleColor]: vars.colorRole.intentDanger.subtle,
            [contrastColor]: vars.colorRole.intentDanger.contrast,
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
