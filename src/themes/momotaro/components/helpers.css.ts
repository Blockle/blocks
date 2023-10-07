import { style } from '@vanilla-extract/css';
import { vars } from '../../../lib/css/theme/vars.css';

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
  // TODO This is for buttons?
  selectors: {
    '&:active:not(:disabled)': {
      transform: 'scale(0.9)',
    },
  },
});
