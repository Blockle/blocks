import {
  choiceGroupVars,
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { buttonHeight } from './buttonBase.css.js';
import { focusable } from './helpers.css.js';

const swatchSize = 40;

// Button colour roles: outlined when unchecked, solid when checked, as Button's
// outline and solid variants
const buttonItem = style([
  {
    '@layer': {
      [layers.theme]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vars.space[2],
        minHeight: buttonHeight.medium,
        minWidth: buttonHeight.medium,
        paddingInline: vars.space[4],
        paddingBlock: vars.space[1],
        fontSize: vars.fontSize.medium,
        fontWeight: vars.fontWeight.medium,
        borderRadius: vars.borderRadius[2],
        borderWidth: vars.borderWidth.thin,
        borderStyle: 'solid',
        borderColor: vars.colorRole.primary.solid,
        color: vars.colorRole.primary.solid,
        backgroundColor: 'transparent',
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `background-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
          },
        },
        selectors: {
          '&:hover:not(:has(:disabled))': {
            backgroundColor: vars.colorRole.primary.subtle,
          },
          '&:has(:checked)': {
            color: vars.colorRole.primary.contrast,
            backgroundColor: vars.colorRole.primary.solid,
          },
          '&:has(:checked):hover:not(:has(:disabled))': {
            backgroundColor: vars.colorRole.primary.solidHover,
          },
        },
      },
    },
  },
  focusable,
]);

const swatchItem = style([
  {
    '@layer': {
      [layers.theme]: {
        display: 'inline-flex',
        borderRadius: vars.borderRadius.full,
        padding: 3,
        borderWidth: vars.borderWidth.thick,
        borderStyle: 'solid',
        borderColor: 'transparent',
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
          },
        },
        selectors: {
          '&:hover:not(:has(:disabled))': {
            borderColor: vars.colorRole.border.strong,
          },
          '&:has(:checked)': {
            borderColor: vars.colorRole.primary.solid,
          },
        },
      },
    },
  },
  focusable,
]);

export const choiceGroup: ThemeComponentsStyles['choiceGroup'] =
  makeComponentTheme('choiceGroup', {
    root: style({
      '@layer': {
        [layers.theme]: {
          gap: vars.space[2],
        },
      },
    }),
    item: style({
      '@layer': {
        [layers.theme]: {
          userSelect: 'none',
        },
      },
    }),
    swatch: style({
      '@layer': {
        [layers.theme]: {
          inlineSize: swatchSize,
          blockSize: swatchSize,
          borderRadius: vars.borderRadius.full,
          backgroundColor: choiceGroupVars.color,
          boxShadow: `inset 0 0 0 1px ${vars.colorRole.border.default}`,
        },
      },
    }),
    variants: {
      variant: {
        button: buttonItem,
        swatch: swatchItem,
      },
    },
    defaultVariants: {
      variant: 'button',
    },
  });
