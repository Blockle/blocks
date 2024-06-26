import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';
import { focusable } from './helpers.css';

export const select = makeComponentTheme('select', {
  select: style([
    {
      color: 'text',
      padding: 'large',
      border: 'none',
      outline: 'none',
      backgroundColor: 'white',
      borderRadius: 'medium',
      boxShadow: 'medium',
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
      outline: style({
        borderWidth: 'small',
        borderStyle: 'solid',
        borderColor: 'primary',
      }),
      solid: style({}),
    },
  },
  icon: style({
    paddingInline: 'large',
  }),
  defaultVariants: {
    variant: 'solid',
  },
});
