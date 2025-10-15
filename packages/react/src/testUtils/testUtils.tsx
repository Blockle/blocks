import { render as rtlRender } from '@testing-library/react';

import { BlocksProvider } from '../components/providers/BlocksProvider/BlocksProvider.js';
import { testingTheme } from './testTheme.css.js';

export * from '@testing-library/react';

export const render = (
  ui: Parameters<typeof rtlRender>[0],
  options?: Parameters<typeof rtlRender>[1],
) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <BlocksProvider theme={testingTheme}>{children}</BlocksProvider>
    ),
    ...options,
  });
};
