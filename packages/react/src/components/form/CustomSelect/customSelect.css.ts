import { style } from '@vanilla-extract/css';

export const select = style({
  appearance: 'base-select',
  boxShadow: '0 0 2px 1px #000',
  selectors: {
    '&::picker(select)': {
      appearance: 'base-select',
    },
  },
});
