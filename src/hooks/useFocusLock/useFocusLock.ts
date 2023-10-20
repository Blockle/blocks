import { useEffect } from 'react';
import { focusFirstElement } from '../../lib/utils/dom-focus';

type UseFocusLock = {
  ref: React.RefObject<HTMLElement>;
  active: boolean;
};

export const useFocusLock = ({ ref, active }: UseFocusLock) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    const handleFocus = (event: FocusEvent) => {
      if (
        ref.current &&
        event.target instanceof HTMLElement &&
        !ref.current.contains(event.target)
      ) {
        focusFirstElement(ref.current);
      }
    };

    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, [active]);
};
