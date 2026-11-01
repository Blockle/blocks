'use client';

import { useState, useSyncExternalStore } from 'react';

import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';

type Entry = object;

// The open modal overlays, in the order they opened, the top one last
let stack: Entry[] = [];

const listeners = new Set<() => void>();

const setStack = (next: Entry[]) => {
  stack = next;

  for (const listener of listeners) {
    listener();
  }
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

/**
 * Puts a modal overlay on the stack of open ones while `open` is true, and
 * returns whether it is the top one: the one opened last, wherever it is
 * mounted. Like the browser's top layer, which shows each modal dialog above
 * the ones shown before it, the order does not follow the React tree.
 */
export const useIsTopModalOverlay = (open: boolean): boolean => {
  const [entry] = useState<Entry>(() => ({}));

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      return;
    }

    setStack([...stack, entry]);

    return () => {
      setStack(stack.filter((item) => item !== entry));
    };
  }, [open, entry]);

  return useSyncExternalStore(
    subscribe,
    () => stack.at(-1) === entry,
    () => false,
  );
};
