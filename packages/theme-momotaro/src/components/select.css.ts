import {
  type ThemeComponentsStyles,
  atoms,
  makeComponentTheme,
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
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 'medium',
        boxShadow: 'medium',
      }),
      {
        border: 'none',
        outline: 'none',
        minHeight: 56,
        transitionDuration: vars.transition.fast,
        transitionProperty: 'box-shadow',
        ':focus-within': {
          outline: '2px solid transparent',
          outlineOffset: '2px',
          boxShadow: `${vars.shadow.small}, ${vars.focus.boxShadow}`,
        },
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
