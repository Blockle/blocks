import type { Theme } from '@blockle/blocks-core';
import { createContext } from 'react';

export type ColorScheme = 'light' | 'dark' | 'system';

export type BlocksProviderContextProps = {
  theme: Theme;
  colorScheme: ColorScheme;
};

export const BlocksProviderContext =
  createContext<BlocksProviderContextProps | null>(null);
