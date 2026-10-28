import {
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const text: ThemeComponentsStyles['text'] = makeComponentTheme('text', {
  variants: {
    color: {
      default: style({ color: vars.colorRole.text.default }),
      muted: style({ color: vars.colorRole.text.muted }),
      disabled: style({ color: vars.colorRole.text.disabled }),
      inverse: style({ color: vars.colorRole.text.inverse }),
    },
  },
  defaultVariants: {
    color: 'default',
  },
});
