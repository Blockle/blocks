import {
  atoms,
  type ComponentThemes,
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

type ButtonIntent = ComponentThemes['button']['variants']['intent'];

/**
 * Points the shared intent variables at the Color roles of one Intent.
 */
function intentStyle(intent: ButtonIntent) {
  const capitalized = `${intent.charAt(0).toUpperCase()}${intent.slice(1)}`;

  return style({
    vars: {
      [intentColor]: vars.color[intent],
      [intentHoverColor]: vars.color[`${intent}Hover`],
      [intentSubtleColor]: vars.color[`${intent}Subtle`],
      [onIntentColor]:
        vars.color[`on${capitalized as Capitalize<ButtonIntent>}`],
    },
  });
}

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
        neutral: intentStyle('neutral'),
        primary: intentStyle('primary'),
        secondary: intentStyle('secondary'),
        success: intentStyle('success'),
        danger: intentStyle('danger'),
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
      intent: 'primary',
    },
  },
);
