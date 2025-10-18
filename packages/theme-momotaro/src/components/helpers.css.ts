import { vars } from '@blockle/blocks-core';
import { createVar, fallbackVar, style } from '@vanilla-extract/css';

export const focusRingColor = createVar();

/**
 * NOTE: When the original element has a transition, make sure to include
 * `box-shadow ${vars.transition.fast}` in the transition property for the
 * focus transition to work correctly.
 */
export const focusable = style({
  // '@media': {
  //   '(prefers-reduced-motion: no-preference)': {
  //     transition: `outline ${vars.transition.fast}`,
  //   },
  // },
  ':focus-visible': {
    outline: '2px solid #AF8EFF',
    outlineOffset: '2px',
  },
  selectors: {
    '&:disabled, &[disabled]': {
      opacity: 0.5,
      cursor: 'auto',
      pointerEvents: 'none',
    },
    '&:has(input:focus-visible)': {
      outline: '2px solid #AF8EFF',
      outlineOffset: '2px',
      // boxShadow: vars.focus.boxShadow,
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
