import { blocksLayerComponent } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  '@layer': {
    [blocksLayerComponent]: {
      position: 'relative',
    },
  },
});

export const select = style({
  '@layer': {
    [blocksLayerComponent]: {
      appearance: 'none',
      inlineSize: '100%',
    },
  },
});

export const icon = style({
  '@layer': {
    [blocksLayerComponent]: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
    },
  },
});
