import { makeTheme } from '@blockle/blocks-core';

import { components } from './components/index.js';
import { tokens } from './tokens.css.js';

export const prelineTheme = makeTheme({
  name: 'preline',
  tokens,
  components,
});
