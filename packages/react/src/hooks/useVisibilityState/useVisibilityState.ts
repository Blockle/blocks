'use client';

import { useCallback, useEffect, useState } from 'react';

type UseVisibilityState = [visible: boolean, hide: () => void];

// Helper hook to know if DOM should be hidden or not
// Useful for dialogs and other components that need to be hidden after animation ends
export const useVisibilityState = (open: boolean): UseVisibilityState => {
  const [visible, setVisible] = useState(open);
  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  return [visible, hide];
};
