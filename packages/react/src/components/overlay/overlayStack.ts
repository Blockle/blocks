'use client';

import { useState, useSyncExternalStore } from 'react';

import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';

// Stands for one open overlay, by identity
type OverlayToken = object;

// The open overlays (Dialogs, Drawers and Popovers), in the order they
// opened, the top one last
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
 * Puts an overlay on the overlay stack while `open` is true, and returns
 * whether it is the top overlay: the one opened last, wherever it is mounted.
 * Like the browser's top layer, which shows each element above the ones shown
 * before it, the order does not follow the React tree.
 *
 * Only the top overlay handles Escape and clicks outside. The stack decides
 * this, not the order in which listeners see an event: React's handlers and
 * document listeners run in an order that can't tell which overlay is on top.
 */
export const useIsTopOverlay = (open: boolean): boolean => {
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
