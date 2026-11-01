'use client';

import { createContext } from 'react';

export type TabListContextValue = {
  /**
   * The value of the tab that takes the tab stop when no tab is selected, so
   * the list stays reachable by keyboard. Undefined in a `TabNav`.
   */
  fallbackValue: string | undefined;
  /** True inside a `TabNav`, so a Tab renders a link */
  nav: boolean;
  /** The element that scrolls sideways when the tabs overflow */
  scrollRef: React.RefObject<HTMLElement | null>;
};

export const TabListContext = createContext<TabListContextValue | null>(null);
