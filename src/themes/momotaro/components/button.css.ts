import { createVar } from '@vanilla-extract/css';
import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';
import { clickable } from './helpers.css';

const primaryColor = createVar();

export const button = makeComponentTheme('button', {
  base: style([
    {
      display: 'inline-flex',
      placeItems: 'center',
      fontSize: 'medium',
      borderRadius: 'medium',
      fontWeight: 'medium',
      // Space between `startSlot | children | endSlot`
      gap: 'small',
    },
    clickable,
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
      small: style({
        paddingX: 'large',
        height: 40,
      }),
      medium: style({
        paddingX: 'xlarge',
        height: 56,
      }),
      large: style({
        paddingX: 'xlarge',
        height: 72,
      }),
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
  //   {
  //     variants: {
  //       variant: 'solid',
  //       size: 'large',
  //     },
  //     style: style({
  //       transform: 'scale(2)',
  //     }),
  //   },
  // ],
  defaultVariants: {
    size: 'small',
    variant: 'solid',
    intent: 'neutral',
  },
});
