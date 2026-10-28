import {
  type ColorMode,
  type ColorModeSetting,
  resolveSystemColorMode,
  systemColorModeQueries,
  systemFallbackColorMode,
} from '@blockle/blocks-core';
import { useContext, useSyncExternalStore } from 'react';

import { BlocksProviderContext } from '../../components/providers/BlocksProvider/context.js';

export type UseColorModeResult = {
  /** What the outermost BlocksProvider was given: `light`, `dark` or `system`. */
  colorMode: ColorModeSetting;
  /** The Color mode actually rendered. Under `system` it follows the OS. */
  resolvedColorMode: ColorMode;
};

const getServerSnapshot = (): ColorMode => systemFallbackColorMode;

const getSystemColorMode = (): ColorMode =>
  resolveSystemColorMode((query) => window.matchMedia(query).matches);

const subscribeToSystemColorMode = (onChange: () => void) => {
  const lists = Object.values(systemColorModeQueries).map((query) =>
    window.matchMedia(query),
  );

  for (const list of lists) {
    list.addEventListener('change', onChange);
  }

  return () => {
    for (const list of lists) {
      list.removeEventListener('change', onChange);
    }
  };
};

const noopSubscribe = () => () => {};

/**
 * The page's Color mode, for JS-driven visuals (charts, canvas, maps) that need
 * to know it. Saving the user's choice and toggling stay the app's job.
 */
export const useColorMode = (): UseColorModeResult => {
  const context = useContext(BlocksProviderContext);

  if (!context) {
    throw new Error('useColorMode must be called within a BlocksProvider');
  }

  const { colorMode } = context;
  const isSystem = colorMode === 'system';

  const systemColorMode = useSyncExternalStore(
    isSystem ? subscribeToSystemColorMode : noopSubscribe,
    isSystem ? getSystemColorMode : getServerSnapshot,
    getServerSnapshot,
  );

  return {
    colorMode,
    resolvedColorMode: isSystem ? systemColorMode : colorMode,
  };
};
