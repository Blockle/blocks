import React, { useEffect } from 'react';

type UseClickOutsideOptions = {
  enabled?: boolean;
};

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void,
  { enabled = true }: UseClickOutsideOptions = {},
) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, onClickOutside, enabled]);
};
