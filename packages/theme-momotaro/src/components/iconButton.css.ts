import {
  atoms,
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

const sizeStyles = {
  small: style({ blockSize: buttonHeight.small }),
  medium: style({ blockSize: buttonHeight.medium }),
  large: style({ blockSize: buttonHeight.large }),
};

const iconSize = {
  small: 20,
  medium: 24,
  large: 28,
};

for (const key of ['small', 'medium', 'large'] as const) {
  globalStyle(`${sizeStyles[key]} > svg`, {
    inlineSize: iconSize[key],
    blockSize: iconSize[key],
  });
}

export const iconButton: ThemeComponentsStyles['iconButton'] =
  makeComponentTheme('iconButton', {
    root: style([
      buttonBase,
      atoms({ justifyContent: 'center' }),
      {
        aspectRatio: '1',
        flexShrink: 0,
        padding: 0,
      },
    ]),
    variants: {
      variant: buttonVariant,
      size: sizeStyles,
      shape: {
        square: buttonRadius,
        circle: style({ borderRadius: '50%' }),
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
