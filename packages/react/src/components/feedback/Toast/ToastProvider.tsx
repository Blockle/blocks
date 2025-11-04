import { useCallback, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { Box } from '../../layout/Box/Box.js';
import { Stack } from '../../layout/Stack/Stack.js';
import * as styles from './Toast.css.js';
import {
  type Toast,
  ToastContext,
  type ToastContextType,
} from './ToastContext.js';

function makeTransition(transition: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      flushSync(() => {
        transition();
      });
    });
  } else {
    transition();
  }
}

export type ToastProviderProps = {
  children?: React.ReactNode;
  position?:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right';
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastsRef = useRef<Toast[]>(toasts);
  toastsRef.current = toasts;

  const removeToast = useCallback((id: string) => {
    makeTransition(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    });
  }, []);

  const addToast = useCallback((toast: Toast) => {
    const toasts = toastsRef.current;
    const match = toasts.findIndex(({ id }) => id === toast.id) !== -1;

    function updateState(prev: Toast[]) {
      const match = prev.findIndex(({ id }) => id === toast.id) !== -1;

      if (match) {
        return prev.map((item) => (item.id === toast.id ? toast : item));
      }

      return [...prev, toast];
    }

    // If the toast already exists, update it instead of adding a new one
    // without the use of view transitions
    if (match) {
      setToasts(updateState);
      return;
    }

    makeTransition(() => {
      setToasts(updateState);
    });

    if (toast.duration) {
      setTimeout(() => {
        toast.onRequestClose();
      }, toast.duration);
    }
  }, []);

  const contextValue = useMemo<ToastContextType>(
    () => ({
      add: addToast,
      remove: removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {children}
      </ToastContext.Provider>

      {/* Should this use popover? */}
      <Box
        asChild
        position="fixed"
        insetBlockEnd={0}
        insetInline={0}
        padding={2}
      >
        <Stack gap={2}>
          {toasts.map(({ id, children }) => (
            <div
              key={id}
              className={styles.container}
              style={{
                viewTransitionName: `toast-${id}`,
              }}
            >
              {children}
            </div>
          ))}
        </Stack>
      </Box>
    </>
  );
};
