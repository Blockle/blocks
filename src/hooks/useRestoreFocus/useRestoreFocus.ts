import { useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * Restores focus to the previously focused element
 */
export const useRestoreFocus = (active: boolean) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (active && !target) {
      setTarget(document.activeElement as HTMLElement);
    }
  }, [active]);

  useEffect(() => {
    if (!active && target instanceof HTMLElement) {
      target.focus();
    }
  }, [active]);
};
