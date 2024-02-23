import { createVar } from '@vanilla-extract/css';
import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';
import { clickable, focusRingColor } from './helpers.css';

// Use css vars to share colors between variants
const intentColor = createVar();
const hoverBackgroundColor = createVar();

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
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: hoverBackgroundColor,
        },
      },
    },
    clickable,
  ]),
  variants: {
    variant: {
      solid: style({
        color: vars.color.white,
        backgroundColor: intentColor,
        border: 'none',
      }),
      outline: style({
        color: intentColor,
        borderWidth: 'small',
        borderStyle: 'solid',
        borderColor: intentColor,
        background: 'transparent',
      }),
      ghost: style({
        color: intentColor,
        background: 'transparent',
      }),
    },
    size: {
      small: style({
        paddingInline: 'large',
        height: 40,
      }),
      medium: style({
        paddingInline: 'xlarge',
        height: 56,
      }),
      large: style({
        paddingInline: 'xlarge',
        height: 72,
      }),
    },
    intent: {
      neutral: style({
        vars: {
          [intentColor]: vars.color.primary,
          [hoverBackgroundColor]: vars.color.primaryLight,
        },
      }),
      danger: style({
        vars: {
          [intentColor]: vars.color.danger,
          [hoverBackgroundColor]: '#fff8f7',
          [focusRingColor]: vars.color.danger,
        },
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'solid',
        intent: 'neutral',
      },
      style: style({
        vars: {
          [hoverBackgroundColor]: vars.color.primaryDark,
        },
      }),
    },
    {
      variants: {
        variant: 'solid',
        intent: 'danger',
      },
      style: style({
        vars: {
          [hoverBackgroundColor]: '#f9b1a9',
        },
      }),
    },
  ],
  defaultVariants: {
    size: 'small',
    variant: 'solid',
    intent: 'neutral',
  },
});
