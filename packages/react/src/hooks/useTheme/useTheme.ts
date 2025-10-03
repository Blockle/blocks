'use client';

import type { Theme } from '@blockle/blocks-core';
import { useContext } from 'react';
import { BlocksProviderContext } from '../../components/providers/BlocksProvider/context.js';

export const useTheme = (): Theme => {
  const context = useContext(BlocksProviderContext);

  if (!context) {
    throw new Error('useTheme must be called within a BlocksProvider');
  }

  return context.theme;
};
