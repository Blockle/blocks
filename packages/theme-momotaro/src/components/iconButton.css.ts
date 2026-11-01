import {
  layers,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { globalStyle, style } from '@vanilla-extract/css';

import {
  buttonBase,
  buttonHeight,
  buttonIntent,
  buttonRadius,
  buttonVariant,
} from './buttonBase.css.js';

const sizeStyle = (blockSize: number) =>
  style({ '@layer': { [layers.theme]: { blockSize } } });

const sizeStyles = {
  small: sizeStyle(buttonHeight.small),
  medium: sizeStyle(buttonHeight.medium),
  large: sizeStyle(buttonHeight.large),
};

const iconSize = {
  small: 20,
  medium: 24,
  large: 28,
};

for (const key of ['small', 'medium', 'large'] as const) {
  globalStyle(`${sizeStyles[key]} > svg`, {
    '@layer': {
      [layers.theme]: {
        inlineSize: iconSize[key],
        blockSize: iconSize[key],
      },
    },
  });
}

export const iconButton: ThemeComponentsStyles['iconButton'] =
  makeComponentTheme('iconButton', {
    root: style([
      buttonBase,
      {
        '@layer': {
          [layers.theme]: {
            justifyContent: 'center',
            aspectRatio: '1',
            flexShrink: 0,
            padding: 0,
          },
        },
      },
    ]),
    variants: {
      variant: buttonVariant,
      size: sizeStyles,
      shape: {
        square: buttonRadius,
        circle: style({
          '@layer': { [layers.theme]: { borderRadius: '50%' } },
        }),
      },
      intent: buttonIntent,
    },
    defaultVariants: {
      size: 'medium',
      variant: 'solid',
      intent: 'primary',
      shape: 'square',
    },
  });
