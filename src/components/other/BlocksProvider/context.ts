import { createContext } from 'react';
import { Theme } from '../../../lib/theme/makeTheme';

export type BlocksProviderContextProps = {
  theme: Theme;
  setAriaHidden: (value: boolean) => void;
};

export const BlocksProviderContext = createContext<BlocksProviderContextProps | null>(null);
