import { blocksLayerAtom } from '@blockle/blocks-core';
import { globalStyle } from '@vanilla-extract/css';

// Must be placed before HTML so we wont override the box-sizing of the root element
globalStyle(':where(*, *::before, *::after)', {
  '@layer': {
    [blocksLayerAtom]: {
      boxSizing: 'inherit',
      WebkitTapHighlightColor: 'transparent',
    },
  },
});

globalStyle(':where(html)', {
  '@layer': {
    [blocksLayerAtom]: {
      lineHeight: 1.5,
      boxSizing: 'border-box',
      WebkitFontSmoothing: 'antialiased',
    },
  },
});

globalStyle(':where(body)', {
  '@layer': {
    [blocksLayerAtom]: {
      margin: 0,
      padding: 0,
      fontFamily: 'Calibri, sans-serif',
    },
  },
});

globalStyle(':where(button, input, optgroup, select, textarea)', {
  '@layer': {
    [blocksLayerAtom]: {
      fontFamily: 'inherit',
      fontSize: '100%',
      lineHeight: 'inherit',
      margin: 0,
      padding: 0,
    },
  },
});

globalStyle(':where(p, ul, ol, pre, blockquote)', {
  '@layer': {
    [blocksLayerAtom]: {
      margin: 0,
      padding: 0,
    },
  },
});

globalStyle(':where(h1, h2, h3, h4, h5, h6)', {
  '@layer': {
    [blocksLayerAtom]: {
      margin: 0,
      padding: 0,
      fontSize: 'inherit',
    },
  },
});

globalStyle(':where(pre)', {
  '@layer': {
    [blocksLayerAtom]: {
      whiteSpace: 'pre-wrap',
    },
  },
});

globalStyle(':where([popover])', {
  '@layer': {
    [blocksLayerAtom]: {
      border: 'unset',
    },
  },
});
