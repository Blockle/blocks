import type { Theme } from '@blockle/blocks-core';
import { createContext } from 'react';

export type BlocksProviderContextProps = {
  theme: Theme;
  setAriaHidden: (value: boolean) => void;
};

export const BlocksProviderContext =
  createContext<BlocksProviderContextProps | null>(null);
