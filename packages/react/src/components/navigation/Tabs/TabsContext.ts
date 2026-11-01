'use client';

import { createContext, useContext } from 'react';

export type TabsContextValue = {
  /** The selected tab's value, or undefined when nothing is selected */
  value: string | undefined;
  setValue: (value: string) => void;
  /** Prefix for the ids generated from each Tab's and TabPanel's value */
  baseId: string;
};

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(part: string): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`${part} must be rendered inside Tabs`);
  }

  return context;
}

// The value is encoded so any string makes a valid id with no whitespace
export function getTabId(baseId: string, value: string) {
  return `${baseId}-tab-${encodeURIComponent(value)}`;
}

// The inverse of getTabId, or undefined when the id isn't one of this Tabs' tabs
export function getTabValue(baseId: string, id: string) {
  const prefix = `${baseId}-tab-`;

  return id.startsWith(prefix)
    ? decodeURIComponent(id.slice(prefix.length))
    : undefined;
}

export function getPanelId(baseId: string, value: string) {
  return `${baseId}-panel-${encodeURIComponent(value)}`;
}
