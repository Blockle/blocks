import { layers } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const stack = style({
  '@layer': {
    [layers.molecule]: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box',
      // Let clicks through the stack's empty space, but not through a toast
      pointerEvents: 'none',
    },
  },
});

export const toast = style({
  '@layer': {
    [layers.molecule]: {
      height: 'fit-content',
      pointerEvents: 'auto',
    },
  },
});

const top = {
  insetBlockStart: 0,
  // Newest toast nearest the top edge
  flexDirection: 'column-reverse',
} as const;

const bottom = { insetBlockEnd: 0 } as const;

const center = { insetInline: 0, marginInline: 'auto' } as const;

const start = { insetInlineStart: 0 } as const;

const end = { insetInlineEnd: 0 } as const;

const placementStyle = (...rules: object[]) =>
  style({ '@layer': { [layers.molecule]: Object.assign({}, ...rules) } });

export const placement = {
  top: placementStyle(top, center),
  'top-start': placementStyle(top, start),
  'top-end': placementStyle(top, end),
  bottom: placementStyle(bottom, center),
  'bottom-start': placementStyle(bottom, start),
  'bottom-end': placementStyle(bottom, end),
};
