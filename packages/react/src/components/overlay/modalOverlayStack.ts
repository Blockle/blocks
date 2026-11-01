'use client';

import { useState, useSyncExternalStore } from 'react';

import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';

// Stands for one open overlay, by identity
type OverlayToken = object;

// The open modal overlays, in the order they opened, the top one last
let stack: OverlayToken[] = [];

const listeners = new Set<() => void>();

const setStack = (next: OverlayToken[]) => {
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
  const [token] = useState<OverlayToken>(() => ({}));

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      return;
    }

    setStack([...stack, token]);

    return () => {
      setStack(stack.filter((item) => item !== token));
    };
  }, [open, token]);

  return useSyncExternalStore(
    subscribe,
    () => stack.at(-1) === token,
    () => false,
  );
};
