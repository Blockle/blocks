import { style } from '@vanilla-extract/css';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';

export const label = makeComponentTheme('label', {
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
        marginLeft: vars.space.xsmall,
      },
    }),
  },
  defaultVariants: {
    size: 'large',
  },
});
