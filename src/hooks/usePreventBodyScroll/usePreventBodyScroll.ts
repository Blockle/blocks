import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

export const usePreventBodyScroll = (enabled = true) => {
  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    const prevOverflow = document.body.style.getPropertyValue('overflow');

    // When there is a scrollbar, body height is greater than window height
    // Then we need to set body position to fixed to prevent body scroll
    // and show scrollbar
    // Otherwise, we set overflow to hidden to prevent body scroll
    if (document.body.scrollHeight > window.innerHeight) {
      document.body.style.position = 'fixed';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.overflow = 'hidden';
    }

    // Revert back to previous overflow state when unmounting
    // or when enabled is set to false
    return () => {
      document.body.style.position = '';
      document.body.style.overflow = prevOverflow;
      document.body.style.overflowY = '';
    };
  }, [enabled]);
};
