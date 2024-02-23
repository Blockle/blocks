import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../../lib/css/layers/layers.css';

export const backdrop = style({
  '@layer': {
    [blocksLayer]: {
      contain: 'layout',
      display: 'flex',
      placeItems: 'center',
      position: 'fixed',
      inlineSize: '100%',
      blockSize: '100%',
      insetInlineStart: 0,
      insetBlockStart: 0,
      overflow: 'hidden',
      zIndex: 1000,
    },
  },
});
