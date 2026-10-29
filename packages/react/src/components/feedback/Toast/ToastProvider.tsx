'use client';

import { classnames, type ToastPlacement } from '@blockle/blocks-core';
import { useCallback, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Alert } from '../Alert/Alert.js';
import * as styles from './Toast.css.js';
import {
  type Toast,
  ToastContext,
  type ToastContextType,
} from './ToastContext.js';

function makeTransition(transition: () => void) {
  if (document.startViewTransition) {
    const viewTransition = document.startViewTransition(() => {
      flushSync(() => {
        transition();
      });
    });

    // A newer transition skips this one; its update still runs, so ignore the rejection
    viewTransition.ready.catch(() => {});
  } else {
    transition();
  }
}

export type { ToastPlacement };

type ToastPosition =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right';

const placementByPosition: Record<ToastPosition, ToastPlacement> = {
  'bottom-left': 'bottom-start',
  'bottom-center': 'bottom',
  'bottom-right': 'bottom-end',
  'top-left': 'top-start',
  'top-center': 'top',
  'top-right': 'top-end',
};

export type ToastProviderProps = {
  children?: React.ReactNode;
  /** Where the toasts sit on the screen. Defaults to `bottom` */
  placement?: ToastPlacement;
  /**
   * @deprecated Use `placement`, which wins when both are passed
   */
  position?: ToastPosition;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  placement: placementProp,
  position,
}) => {
  const placement =
    placementProp ?? (position ? placementByPosition[position] : 'bottom');
  const rootClassName = useComponentStyles('toast', {
    root: true,
    variants: { placement },
  });
  const toastClassName = useComponentStyles('toast', {
    toast: true,
    variants: { placement },
  });
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
      const toastId = toast.id;
      setTimeout(() => {
        makeTransition(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
        });
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
      <div
        className={classnames(
          styles.stack,
          styles.placement[placement],
          rootClassName,
        )}
      >
        {toasts.map(({ id, children, intent }) => (
          <Alert
            intent={intent}
            key={id}
            className={classnames(styles.toast, toastClassName)}
            style={{
              viewTransitionName: `toast-${id}`,
            }}
            onRequestClose={() => {
              removeToast(id);
            }}
          >
            {children}
          </Alert>
        ))}
      </div>
    </>
  );
};
