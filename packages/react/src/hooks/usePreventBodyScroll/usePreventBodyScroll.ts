'use client';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';

// The number of enabled callers, the body is locked while there is one
let lockCount = 0;

// Undoes the lock, set by the first caller
let unlock: (() => void) | null = null;

const lock = () => {
  const prevOverflow = document.body.style.getPropertyValue('overflow');
  const prevScrollTop = document.documentElement.scrollTop;

  // When there is a scrollbar visible, then we need to set body position
  // to fixed to prevent body scroll and show scrollbar
  // Otherwise, we set overflow to hidden to prevent body scroll
  if (document.body.scrollHeight > window.innerHeight) {
    document.body.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    document.body.style.overflowY = 'scroll';
    document.body.style.width = '100%';

    // Prevent body from jumping to top, so move it to previous scroll position
    document.body.style.top = `-${prevScrollTop}px`;
  } else {
    document.body.style.overflow = 'hidden';
  }

  return () => {
    document.body.style.position = '';
    document.body.style.overflow = prevOverflow;
    document.body.style.overflowY = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.documentElement.scrollTop = prevScrollTop;
  };
};

/**
 * Prevents the body from scrolling while enabled. Any number of callers can
 * be enabled at once: the first locks the body, and the body's styles and
 * scroll position are restored once the last one is disabled or unmounts.
 */
export const usePreventBodyScroll = (enabled = true) => {
  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    lockCount += 1;

    if (lockCount === 1) {
      unlock = lock();
    }

    return () => {
      lockCount -= 1;

      if (lockCount === 0) {
        unlock?.();
        unlock = null;
      }
    };
  }, [enabled]);
};
