import { style } from '@vanilla-extract/css';
import { blocksLayer } from '../../lib/css/layers/layers.css';

export const backdrop = style({
  '@layer': {
    [blocksLayer]: {
      contain: 'layout',
      display: 'flex',
      placeItems: 'center',
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      overflow: 'hidden',
      zIndex: 1000,
    },
  },
});
