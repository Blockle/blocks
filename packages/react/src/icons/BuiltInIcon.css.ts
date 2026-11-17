import { layers } from '@blockle/blocks-core';
import { globalStyle, style } from '@vanilla-extract/css';

// The wrapper sets the icon's size. A component's own style or a theme sizes
// it; the 1em fallback sits in the lowest layer so either always wins,
// whatever order the stylesheets load in
export const builtInIcon = style({
  '@layer': {
    [layers.reset]: {
      inlineSize: '1em',
      blockSize: '1em',
    },
    [layers.molecule]: {
      display: 'block',
      flexShrink: 0,
    },
  },
});

// Any library's svg fills the wrapper, whatever width and height it sets
globalStyle(`${builtInIcon} > svg`, {
  '@layer': {
    [layers.molecule]: {
      display: 'block',
      inlineSize: '100%',
      blockSize: '100%',
      color: 'currentColor',
    },
  },
});
