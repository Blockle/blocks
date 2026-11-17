'use client';

import { useSyncExternalStore } from 'react';

// The <dialog> elements open as modal, in the order they opened, the top one
// last. Internal: not part of the public API.
let stack: HTMLDialogElement[] = [];

const listeners = new Set<() => void>();

const setStack = (next: HTMLDialogElement[]) => {
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
 * Puts a <dialog> that was just shown as modal on the modal stack, and
 * returns a function that takes it off again.
 */
export const pushModal = (dialog: HTMLDialogElement) => {
  setStack([...stack, dialog]);

  return () => {
    setStack(stack.filter((item) => item !== dialog));
  };
};

/**
 * The <dialog> shown as modal last, which is on top of the others, or null
 * when none is open.
 */
export const useTopModal = (): HTMLDialogElement | null =>
  useSyncExternalStore(
    subscribe,
    () => stack.at(-1) ?? null,
    () => null,
  );
