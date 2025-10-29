import { useMemo, useState } from 'react';
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
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const contextValue = useMemo<ToastContextType>(() => {
    function removeToast(id: string) {
      makeTransition(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      });
    }

    function addToast(toast: Toast) {
      makeTransition(() => {
        setToasts((prev) => [toast, ...prev]);
      });

      if (toast.duration) {
        setTimeout(() => {
          toast.onRequestClose();
        }, toast.duration);
      }
    }

    return {
      toasts,
      add: addToast,
      remove: removeToast,
    };
  }, [toasts]);

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
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={styles.container}
              style={{
                viewTransitionName: `toast-${toast.id}`,
              }}
              role="alert"
            >
              {toast.children}
            </div>
          ))}
        </Stack>
      </Box>
    </>
  );
};
