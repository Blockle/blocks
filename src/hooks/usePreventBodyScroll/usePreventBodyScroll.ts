import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

export const usePreventBodyScroll = (enabled = true) => {
  useIsomorphicLayoutEffect(() => {
    const prevValue = document.body.style.getPropertyValue('overflow');

    if (enabled) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = prevValue;
    };
  }, [enabled]);
};
