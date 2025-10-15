import {
  type ThemeComponentsStyles,
  makeComponentTheme,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const label: ThemeComponentsStyles['label'] = makeComponentTheme(
  'label',
  {
    base: style({}),
    variants: {
      size: {
        small: style({
          fontSize: vars.fontSize.xsmall,
        }),
        medium: style({
          fontSize: vars.fontSize.small,
        }),
        large: style({
          fontSize: vars.fontSize.medium,
        }),
      },
      required: style({
        ':after': {
          content: '"*"',
          marginLeft: vars.space[1],
        },
      }),
    },
    defaultVariants: {
      size: 'large',
    },
  },
);
