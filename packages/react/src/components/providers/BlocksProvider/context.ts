import type { Theme } from '@blockle/blocks-core';
import { createContext } from 'react';

export type BlocksProviderContextProps = {
  theme: Theme;
};

export const BlocksProviderContext =
  createContext<BlocksProviderContextProps | null>(null);
