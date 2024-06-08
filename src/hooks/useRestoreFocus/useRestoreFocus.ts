import { useEffect, useRef } from 'react';

const isBrowser = typeof window !== 'undefined';

/**
 * Restores focus to the previously focused element
 */
export const useRestoreFocus = (active: boolean) => {
  const target = useRef<HTMLElement | null>(null);

  if (isBrowser && active && !target.current) {
    target.current = document.activeElement as HTMLElement;
  }

  useEffect(() => {
    if (target.current && !active && target.current instanceof HTMLElement) {
      target.current?.focus();
      target.current = null;
    }
  }, [active]);
};
