import { useContext } from 'react';
import { BlocksProviderContext } from '../../components/other/BlocksProvider/context';

export const useTheme = () => {
  const theme = useContext(BlocksProviderContext);

  if (!theme) {
    throw new Error('useTheme must be used within a BlocksProvider');
  }

  return theme;
};
