import { createVar, style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { makeComponentTheme } from '../../../lib/css/theme/makeComponentTheme';
import { vars } from '../../../lib/css/theme/vars.css';
import { focusable } from './helpers.css';

const primaryColor = createVar();

export const button = makeComponentTheme('button', {
  base: style([
    atoms({
      display: 'inline-flex',
      placeItems: 'center',
      fontSize: 'medium',
      borderRadius: 'medium',
      fontWeight: 'medium',
    }),
    focusable,
  ]),
  variants: {
    variant: {
      solid: style({
        color: vars.color.white,
        backgroundColor: primaryColor,
        border: 'none',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.primaryDark,
          },
        },
      }),
      outline: style({
        color: primaryColor,
        borderWidth: vars.borderWidth.small,
        borderStyle: 'solid',
        borderColor: primaryColor,
        background: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.primaryLight,
          },
        },
      }),
      ghost: style({
        color: primaryColor,
        background: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.primaryLight,
          },
        },
      }),
    },
    size: {
      small: style([
        atoms({
          paddingX: 'large',
        }),
        {
          height: 40,
        },
      ]),
      medium: style([
        atoms({
          paddingX: 'xlarge',
        }),
        {
          height: 56,
        },
      ]),
      large: style([
        atoms({
          paddingX: 'xlarge',
        }),
        {
          height: 72,
        },
      ]),
    },
    intent: {
      neutral: style({
        vars: {
          [primaryColor]: vars.color.primary,
        },
      }),
      danger: style({
        vars: {
          [primaryColor]: vars.color.danger,
        },
      }),
    },
  },
  // compoundVariants: [
  //   {
  //     variants: {
  //       intent: 'danger',
  //       variant: 'ghost',
  //       loading: true,
  //     },
  //     style: style({
  //       color: vars.color.danger,
  //       fontSize: vars.fontSize.small,
  //       background: 'red',
  //     }),
  //   },
  // ],
  defaultVariants: {
    size: 'small',
    variant: 'ghost',
    intent: 'neutral',
  },
});
