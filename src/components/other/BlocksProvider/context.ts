import { createContext } from 'react';

export type BlocksProviderContextProps = {
  setAriaHidden: (value: boolean) => void;
};

export const BlocksProviderContext =
  createContext<BlocksProviderContextProps | null>(null);
