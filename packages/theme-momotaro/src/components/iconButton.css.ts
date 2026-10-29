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
  buttonVariant,
} from './buttonBase.css.js';

const size = {
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
  globalStyle(`${size[key]} > svg`, {
    inlineSize: iconSize[key],
    blockSize: iconSize[key],
  });
}

export const iconButton: ThemeComponentsStyles['iconButton'] =
  makeComponentTheme('iconButton', {
    root: style([
      buttonBase,
      {
        aspectRatio: '1',
        flexShrink: 0,
        padding: 0,
      },
    ]),
    variants: {
      variant: buttonVariant,
      size,
      shape: {
        square: atoms({ borderRadius: 2 }),
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
