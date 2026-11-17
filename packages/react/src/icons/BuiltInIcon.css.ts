import { layers } from '@blockle/blocks-core';
import { globalStyle, style } from '@vanilla-extract/css';

// The wrapper sets the icon's size; a component's own style (or a theme)
// sizes it, and 1em is the fallback
export const builtInIcon = style({
  '@layer': {
    [layers.molecule]: {
      display: 'block',
      flexShrink: 0,
      inlineSize: '1em',
      blockSize: '1em',
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
