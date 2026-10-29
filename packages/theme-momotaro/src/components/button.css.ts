import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import {
  buttonBase,
  buttonHeight,
  buttonIntent,
  buttonVariant,
} from './buttonBase.css.js';

export const button: ThemeComponentsStyles['button'] = makeComponentTheme(
  'button',
  {
    root: style([
      atoms({
        fontSize: 'medium',
        borderRadius: 2,
        fontWeight: 'medium',
        gap: 2,
        paddingBlock: 1,
      }),
      buttonBase,
    ]),
    variants: {
      variant: buttonVariant,
      size: {
        small: style([
          atoms({
            paddingInline: 3,
          }),
          {
            minHeight: buttonHeight.small,
          },
        ]),
        medium: style([
          atoms({
            paddingInline: 4,
          }),
          {
            minHeight: buttonHeight.medium,
          },
        ]),
        large: style([
          atoms({
            paddingInline: 5,
          }),
          {
            minHeight: buttonHeight.large,
          },
        ]),
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
