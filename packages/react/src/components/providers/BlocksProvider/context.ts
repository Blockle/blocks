'use client';

import type { ColorModeSetting, Theme } from '@blockle/blocks-core';
import { createContext } from 'react';

/**
 * The icons Blocks draws inside its own components, keyed by meaning.
 * Each value is a rendered element, such as `<Check />`, so a Server Component
 * can pass it. See ADR-0010.
 */
export type BlocksIcons = {
  /** The check mark in a checked Checkbox */
  check: React.ReactNode;
  /** The indicator at the end of a Select */
  chevronDown: React.ReactNode;
  /** NumericInput's decrement button */
  minus: React.ReactNode;
  /** NumericInput's increment button */
  plus: React.ReactNode;
  /** The close button on each Toast */
  close: React.ReactNode;
};

export type BlocksProviderContextProps = {
  theme: Theme;
  /** The outermost provider's colorMode, shared with nested providers. */
  colorMode: ColorModeSetting;
  /** Icon overrides, merged over those of any parent provider. */
  icons: Partial<BlocksIcons>;
};

export const BlocksProviderContext =
  createContext<BlocksProviderContextProps | null>(null);
