import { momotaro } from '@blockle/blocks-theme-momotaro';
import { render as browserRender } from 'vitest-browser-react';

import { BlocksProvider } from '../../components/providers/BlocksProvider/BlocksProvider.js';

/**
 * Renders the UI in a real browser, under BlocksProvider with the momotaro theme.
 * Use for tests that need real computed styles.
 */
export const render = (
  ui: Parameters<typeof browserRender>[0],
  options?: Parameters<typeof browserRender>[1],
) => {
  return browserRender(ui, {
    wrapper: ({ children }) => (
      <BlocksProvider theme={momotaro}>{children}</BlocksProvider>
    ),
    ...options,
  });
};
