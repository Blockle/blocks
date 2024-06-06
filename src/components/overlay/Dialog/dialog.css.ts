import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../../lib/css/layers/layers.css';

export const dialog = style({
  '@layer': {
    [blocksLayer]: {
      position: 'fixed',
      inset: 0,
      border: 'none',
      '::backdrop': {
        // Remove pointer event to prevent clicks on the backdrop
        // and make it easier to check if the click was outside the dialog
        pointerEvents: 'none',
      },
    },
  },
});
