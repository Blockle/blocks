import { layers, vars } from '@blockle/blocks-core';
import { style } from '@vanilla-extract/css';

export const root = style({
  '@layer': {
    [layers.molecule]: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: vars.space[2],
    },
  },
});

// The item is the click target; the real input is stretched over it, hidden
export const item = style({
  '@layer': {
    [layers.molecule]: {
      position: 'relative',
      cursor: 'pointer',
      selectors: {
        '&:has(:disabled)': {
          cursor: 'auto',
        },
        // The input is hidden, so the item shows the focus ring instead
        '&:has(:focus-visible)': {
          outline: `2px solid ${vars.colorRole.focusRing.color}`,
          outlineOffset: 2,
        },
      },
    },
  },
});

export const input = style({
  '@layer': {
    [layers.molecule]: {
      position: 'absolute',
      inset: 0,
      margin: 0,
      opacity: 0,
      appearance: 'none',
      cursor: 'inherit',
      selectors: {
        '&:focus-visible': {
          outline: 'none',
        },
      },
    },
  },
});

export const swatch = style({
  '@layer': {
    [layers.molecule]: {
      display: 'block',
      flexShrink: 0,
      pointerEvents: 'none',
    },
  },
});
