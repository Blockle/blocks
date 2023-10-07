import { createContext } from 'react';
import { ComponentThemesMap } from '../../lib/css/theme/componentThemes';

export type BlocksProviderContextData = {
  vars: string;
  components: ComponentThemesMap;
};

export const BlocksProviderContext = createContext<BlocksProviderContextData | null>(null);
