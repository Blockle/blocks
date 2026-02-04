import { layers } from '@blockle/blocks-core';
import { globalStyle } from '@vanilla-extract/css';

globalStyle(':where(*,:after,:before,::backdrop)', {
  [layers.reset]: {
    boxSizing: 'inherit',
    border: '0 none',
    margin: 0,
    padding: 0,
  },
});

globalStyle(':where(html,:host)', {
  boxSizing: 'border-box',
  '@layer': {
    [layers.reset]: {
      lineHeight: 1.5,
      WebkitFontSmoothing: 'antialiased',
      WebkitTapHighlightColor: 'transparent',
    },
  },
});

globalStyle(':where(button,input,select,optgroup,textarea)', {
  '@layer': {
    [layers.reset]: {
      fontFamily: 'inherit',
      fontSize: '100%',
      lineHeight: 'inherit',
      color: 'inherit',
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

globalStyle(':where(h1,h2,h3,h4,h5,h6)', {
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

globalStyle(':where(a)', {
  '@layer': {
    [layers.reset]: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  },
});
