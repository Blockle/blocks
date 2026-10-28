'use client';

import type { ColorModeSetting, Theme } from '@blockle/blocks-core';
import { createContext } from 'react';

export type BlocksProviderContextProps = {
  theme: Theme;
  /** The outermost provider's colorMode, shared with nested providers. */
  colorMode: ColorModeSetting;
};

export const BlocksProviderContext =
  createContext<BlocksProviderContextProps | null>(null);
