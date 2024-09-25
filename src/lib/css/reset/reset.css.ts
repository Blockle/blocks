import { globalStyle } from '@vanilla-extract/css';

// Must be placed before HTML so we wont override the box-sizing of the root element
globalStyle(':where(*, *::before, *::after)', {
  boxSizing: 'inherit',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle(':where(html)', {
  lineHeight: 1.5,
  boxSizing: 'border-box',
  WebkitFontSmoothing: 'antialiased',
});

globalStyle(':where(body)', {
  margin: 0,
  padding: 0,
  fontFamily: 'Calibri, sans-serif',
});

globalStyle(':where(button, input, optgroup, select, textarea)', {
  fontFamily: 'inherit',
  fontSize: '100%',
  lineHeight: 'inherit',
  margin: 0,
  padding: 0,
});

globalStyle(':where(p, ul, ol, pre, blockquote)', {
  margin: 0,
  padding: 0,
});

globalStyle(':where(h1, h2, h3, h4, h5, h6)', {
  margin: 0,
  padding: 0,
  fontSize: 'inherit',
});

globalStyle(':where(pre)', {
  whiteSpace: 'pre-wrap',
});
