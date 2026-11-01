import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import {
  buttonBase,
  buttonHeight,
  buttonIntent,
  buttonRadius,
  buttonVariant,
} from './buttonBase.css.js';

const sizeStyle = (paddingInline: string, minHeight: number) =>
  style({
    '@layer': {
      [layers.theme]: {
        paddingInline,
        minHeight,
      },
    },
  });

export const button: ThemeComponentsStyles['button'] = makeComponentTheme(
  'button',
  {
    root: style([
      {
        '@layer': {
          [layers.theme]: {
            fontSize: vars.fontSize.medium,
            fontWeight: vars.fontWeight.medium,
            gap: vars.space[2],
            paddingBlock: vars.space[1],
          },
        },
      },
      buttonBase,
      buttonRadius,
    ]),
    variants: {
      variant: buttonVariant,
      size: {
        small: sizeStyle(vars.space[3], buttonHeight.small),
        medium: sizeStyle(vars.space[4], buttonHeight.medium),
        large: sizeStyle(vars.space[5], buttonHeight.large),
      },
      intent: buttonIntent,
    },
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
      intent: 'primary',
    },
  },
);
