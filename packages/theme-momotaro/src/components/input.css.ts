import { atoms, makeComponentTheme, vars } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const input = makeComponentTheme('input', {
  input: style([
    atoms({
      color: 'text',
      padding: 'large',
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
      '@media': {
        '(prefers-reduced-motion: no-preference)': {
          transition: `box-shadow ${vars.transition.fast}`,
        },
      },
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
    }),
  ]),
});
