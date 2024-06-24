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

    // Wait for the next frame to attach the event listener
    // This is to prevent the click event that triggered this hook from being caught
    const rafId = requestAnimationFrame(() => {
      document.addEventListener('click', listener);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', listener);
    };
  }, [ref, onClickOutside, enabled]);
};
