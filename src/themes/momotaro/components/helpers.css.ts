import { style } from '@vanilla-extract/css';
import { vars } from '../../../lib/theme/vars.css';

export const focusable = style({
  ':focus-visible': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: vars.focus.boxShadow,
    transitionDuration: vars.transition.fast,
    transitionProperty: 'box-shadow',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'auto',
  },
  selectors: {
    '&:has(input:focus-visible)': {
      outline: '2px solid transparent',
      outlineOffset: '2px',
      boxShadow: vars.focus.boxShadow,
      transitionDuration: vars.transition.fast,
      transitionProperty: 'box-shadow',
    },
    '&:has(input:disabled)': {
      opacity: 0.5,
      cursor: 'auto',
    },
  },
});

export const clickable = style([
  focusable,
  {
    selectors: {
      '&:active:not(:disabled)': {
        transform: 'scale(0.9)',
      },
    },
  },
]);
