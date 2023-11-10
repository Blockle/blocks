import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../../../lib/theme/vars.css';

export const focusRingColor = createVar();

export const focusable = style({
  ':focus-visible': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: `0 0 1px 2px ${fallbackVar(focusRingColor, '#AF8EFF')}`,
    transitionDuration: vars.transition.fast,
    transitionProperty: 'box-shadow',
  },
  selectors: {
    '&:disabled, &[disabled]': {
      opacity: 0.5,
      cursor: 'auto',
      pointerEvents: 'none',
    },
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
    ':active': {
      transform: 'scale(0.975)',
    },
  },
]);
