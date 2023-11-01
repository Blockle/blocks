import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

export const usePreventBodyScroll = (enabled = true) => {
  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      return;
    }

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

    // Revert back to previous styles when unmounting
    // or when enabled is set to false
    return () => {
      document.body.style.position = '';
      document.body.style.overflow = prevOverflow;
      document.body.style.overflowY = '';
      document.body.style.width = '';
      document.documentElement.scrollTop = prevScrollTop;
    };
  }, [enabled]);
};
