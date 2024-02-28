import { useContext } from 'react';
import { BlocksProviderContext } from '../../components/other/BlocksProvider/context';

export const useTheme = () => {
  const context = useContext(BlocksProviderContext);

  if (!context) {
    throw new Error('useTheme must be used within a BlocksProvider');
  }

  return context.theme;
};
