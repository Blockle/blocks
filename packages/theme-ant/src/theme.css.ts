import { makeTheme } from '@blockle/blocks-core';

import { components } from './components/index.js';
import { tokens } from './tokens.css.js';

export const ant = makeTheme({
  name: 'ant',
  tokens,
  components,
});
