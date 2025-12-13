import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const drawer = style({
  '@layer': {
    [layers.molecule]: {
      position: 'fixed',
      border: 'none',
      margin: 0,
      // unset default dialog styles
      maxHeight: '100%',
      maxWidth: '100%',
      left: 'unset',
      top: 'unset',
      overflow: 'auto',
      '::backdrop': {
        // Remove pointer event to prevent clicks on the backdrop
        // and make it easier to check if the click was outside the dialog
        pointerEvents: 'none',
      },
    },
  },
});

export const placement = {
  left: style({
    '@layer': {
      [layers.molecule]: {
        top: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        width: '300px',
      },
    },
  }),
  right: style({
    '@layer': {
      [layers.molecule]: {
        top: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '300px',
      },
    },
  }),
  top: style({
    '@layer': {
      [layers.molecule]: {
        top: 0,
        left: 0,
        width: '100%',
        height: '300px',
      },
    },
  }),
  bottom: style({
    '@layer': {
      [layers.molecule]: {
        bottom: 0,
        left: 0,
        width: '100%',
        height: '300px',
      },
    },
  }),
};
