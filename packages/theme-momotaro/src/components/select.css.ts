import {
  atoms,
  makeComponentTheme,
  type ThemeComponentsStyles,
  vars,
} from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

import { focusable } from './helpers.css.js';

export const select: ThemeComponentsStyles['select'] = makeComponentTheme(
  'select',
  {
    select: style([
      atoms({
        color: 'text-700',
        paddingInline: 3,
        paddingBlock: 1,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 2,
      }),
      {
        border: 'none',
        outline: 'none',
        minHeight: 40,
        transitionDuration: vars.transition.fast,
        transitionProperty: 'outline-color, outline-offset',
        // ':focus-within': {
        //   outline: '2px solid transparent',
        //   outlineOffset: '2px',
        //   boxShadow: `${vars.shadow.small}, ${vars.focus.boxShadow}`,
        // },
      },
      focusable,
    ]),
    variants: {
      variant: {
        outline: style([
          atoms({
            borderWidth: 'thin',
            borderColor: 'primary-500',
          }),
          {
            borderStyle: 'solid',
          },
        ]),
        solid: style({}),
      },
    },
    icon: atoms({
      paddingInline: 3,
    }),
    defaultVariants: {
      variant: 'solid',
    },
  },
);
