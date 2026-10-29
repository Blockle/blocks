import { atoms, vars } from '@blockle/blocks-core';
import { createVar, style } from '@vanilla-extract/css';

import { clickable } from './helpers.css.js';

/**
 * Styles shared by the `button` and `iconButton` themes
 */

// Use css vars to share colors between variants
const solidColor = createVar();
const solidHoverColor = createVar();
const subtleColor = createVar();
const contrastColor = createVar();

// Heights match so buttons and icon buttons sit flush next to each other
export const buttonHeight = {
  small: 40,
  medium: 48,
  large: 56,
} as const;

export const buttonBase = style([
  atoms({
    display: 'inline-flex',
    placeItems: 'center',
  }),
  clickable,
]);

export const buttonRadius = atoms({
  borderRadius: 2,
});

export const buttonVariant = {
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
};

export const buttonIntent = {
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
};
