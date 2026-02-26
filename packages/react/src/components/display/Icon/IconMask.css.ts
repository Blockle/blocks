import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const iconMask = style({
  '@layer': {
    [layers.molecule]: {
      aspectRatio: '1 / 1',
      backgroundColor: 'currentcolor',
      maskPosition: 'center',
      maskRepeat: 'no-repeat',
      maskSize: '100%',
    },
  },
});
