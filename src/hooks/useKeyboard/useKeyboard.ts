'use client';

import { useEffect } from 'react';

type UseKeyboardOptions = {
  enabled?: boolean;
  type?: 'keydown' | 'keyup';
};

// useKeyboardEvent?
export const useKeyboard = (
  key: KeyboardEvent['key'],
  callback: (event: KeyboardEvent) => void,
  { enabled = true, type = 'keydown' }: UseKeyboardOptions = {},
) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === key) {
        callback(event);
      }
    }

    document.addEventListener(type, handleKeyDown);

    return () => {
      document.removeEventListener(type, handleKeyDown);
    };
  }, [callback, enabled, key, type]);
};
