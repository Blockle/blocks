import { makeComponentTheme } from '../../../lib/css/theme/makeComponentTheme';
import { vars } from '../../../lib/css/theme/vars.css';

export const button = makeComponentTheme({
  type: 'button',
  base: {
    // ...
    borderRadius: '9999px',
  },
  variants: {
    // ...
    variant: {
      solid: {
        color: vars.color.primary,
      },
      outline: {},
      ghost: {},
      link: {},
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
  compoundVariants: [
    // ...
    {
      variants: {
        variant: 'solid',
        size: 'small',
      },
      style: {
        // ...
      },
    },
  ],
  defaultVariants: {
    // ...
    variant: 'ghost',
  },
});
