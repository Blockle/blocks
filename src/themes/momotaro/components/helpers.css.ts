import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../../../lib/theme/vars.css';

export const focusRingColor = createVar();

/**
 * NOTE: When the original element has a transition, make sure to include
 * `box-shadow ${vars.transition.fast}` in the transition property for the
 * focus transition to work correctly.
 */
export const focusable = style({
  transition: `box-shadow ${vars.transition.fast}`,
  ':focus-visible': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: `0 0 1px 2px ${fallbackVar(focusRingColor, '#AF8EFF')}`,
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
