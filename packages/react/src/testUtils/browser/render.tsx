import type { Theme } from '@blockle/blocks-core';
import { momotaro } from '@blockle/blocks-theme-momotaro';
import { render as browserRender } from 'vitest-browser-react';

import {
  BlocksProvider,
  type BlocksProviderProps,
} from '../../components/providers/BlocksProvider/BlocksProvider.js';

type RenderOptions = Parameters<typeof browserRender>[1] & {
  /** Passed to the outermost BlocksProvider. Omit to use its default. */
  colorMode?: BlocksProviderProps['colorMode'];
  /** The theme to render under. Defaults to momotaro. */
  theme?: Theme;
};

/**
 * Renders the UI in a real browser, under BlocksProvider with the momotaro theme
 * unless `theme` says otherwise.
 * Use for tests that need real computed styles.
 */
export const render = (
  ui: Parameters<typeof browserRender>[0],
  { colorMode, theme = momotaro, ...options }: RenderOptions = {},
) => {
  return browserRender(ui, {
    wrapper: ({ children }) => (
      <BlocksProvider theme={theme} colorMode={colorMode}>
        {children}
      </BlocksProvider>
    ),
    ...options,
  });
};
