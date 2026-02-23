import { atoms, vars } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const day = style([
  atoms({
    cursor: 'pointer',
  }),
  {
    appearance: 'none',
    ':hover': {
      backgroundColor: '#bbb7b7',
    },
    ':focus-visible': {
      backgroundColor: vars.color['primary-600'],
      outline: `2px solid ${vars.color['primary-700']}`,
    },
  },
]);

export const daySelected = style([
  atoms({
    backgroundColor: 'primary-500',
    color: 'white',
  }),
  {
    ':hover': {
      backgroundColor: vars.color['primary-600'],
    },
  },
]);

export const dayToday = atoms({
  backgroundColor: 'primary-100',
  color: 'text-900',
});

export const dayOutsideMonth = atoms({
  color: 'text-600',
});
