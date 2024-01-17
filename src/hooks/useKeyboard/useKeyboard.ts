import { useEffect } from 'react';

type UseKeyboardOptions = {
  enabled?: boolean;
  type?: 'keydown' | 'keyup';
};

export const useKeyboard = (
  key: KeyboardEvent['key'],
  callback: () => void,
  { enabled = true, type = 'keydown' }: UseKeyboardOptions = {},
) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === key) {
        callback();
      }
    }

    document.addEventListener(type, handleKeyDown);

    return () => {
      document.removeEventListener(type, handleKeyDown);
    };
  }, [callback, enabled, key, type]);
};
