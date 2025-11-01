import { layers } from '@blockle/blocks-core';
import { globalStyle } from '@vanilla-extract/css';

// Must be placed before HTML so we wont override the box-sizing of the root element
globalStyle(':where(*, *::before, *::after)', {
  '@layer': {
    [layers.reset]: {
      boxSizing: 'inherit',
      WebkitTapHighlightColor: 'transparent',
    },
  },
});

globalStyle(':where(html)', {
  '@layer': {
    [layers.reset]: {
      lineHeight: 1.5,
      boxSizing: 'border-box',
      WebkitFontSmoothing: 'antialiased',
    },
  },
});

globalStyle(':where(body)', {
  '@layer': {
    [layers.reset]: {
      margin: 0,
      padding: 0,
      fontFamily: 'Calibri, sans-serif',
    },
  },
});

globalStyle(':where(button, input, optgroup, select, textarea)', {
  '@layer': {
    [layers.reset]: {
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
    [layers.reset]: {
      margin: 0,
      padding: 0,
    },
  },
});

globalStyle(':where(h1, h2, h3, h4, h5, h6)', {
  '@layer': {
    [layers.reset]: {
      margin: 0,
      padding: 0,
      fontSize: 'inherit',
    },
  },
});

globalStyle(':where(pre)', {
  '@layer': {
    [layers.reset]: {
      whiteSpace: 'pre-wrap',
    },
  },
});

globalStyle(':where([popover])', {
  '@layer': {
    [layers.reset]: {
      border: 'unset',
    },
  },
});
