import { style } from '@vanilla-extract/css';
import { atoms } from '../../../lib/css/atoms';
import { focusable } from './helpers.css';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { vars } from '../../../lib/theme/vars.css';

export const input = makeComponentTheme('input', {
  input: style([
    atoms({
      color: 'text',
      paddingY: 'large',
      paddingX: 'large',
      border: 'none',
      borderRadius: 'small',
    }),
    {
      outline: 'none',
      background: 'transparent',
      '::placeholder': {
        color: vars.color.textLight,
      },
      ':disabled': {},
    },
  ]),
  container: style([
    {
      minHeight: 56,
      transitionDuration: vars.transition.fast,
      transitionProperty: 'box-shadow',
      ':focus-within': {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        boxShadow: `${vars.shadow.small}, ${vars.focus.boxShadow}`,
      },
    },
    atoms({
      backgroundColor: 'white',
      borderRadius: 'medium',
      boxShadow: 'medium',
      gap: 'large',
    }),
  ]),
});
