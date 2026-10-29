'use client';

import { classnames, type ToastPlacement } from '@blockle/blocks-core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { CloseIcon } from '../../../icons/icons.js';
import { IconButton } from '../../form/IconButton/IconButton.js';
import { Alert } from '../Alert/Alert.js';
import * as styles from './Toast.css.js';
import {
  type Toast,
  ToastContext,
  type ToastContextType,
} from './ToastContext.js';
import { useCountdowns } from './useCountdowns.js';

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
  /**
   * Accessible name of each Toast's close button. Pass your own wording to
   * translate it.
   * @default 'Close'
   */
  closeLabel?: string;
  /** Where the toasts sit on the screen. Defaults to `bottom` */
  placement?: ToastPlacement;
  /**
   * @deprecated Use `placement`, which wins when both are passed
   */
  position?: ToastPosition;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  closeLabel = 'Close',
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

  const stackRef = useRef<HTMLDivElement>(null);
  const hoveredIdsRef = useRef(new Set<string>());
  const focusWithinRef = useRef(false);

  const commitRemoval = useCallback((id: string) => {
    makeTransition(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    });
  }, []);

  const countdowns = useCountdowns(commitRemoval);

  // Every toast pauses while any of them is hovered or focused, or the page
  // is hidden, so nobody loses a toast they're still reading
  const syncPaused = useCallback(() => {
    countdowns.setPaused(
      hoveredIdsRef.current.size > 0 ||
        focusWithinRef.current ||
        document.visibilityState === 'hidden',
    );
  }, [countdowns]);

  const removeToast = useCallback(
    (id: string) => {
      countdowns.clear(id);
      // A removed toast fires no pointerleave
      hoveredIdsRef.current.delete(id);
      syncPaused();
      commitRemoval(id);
    },
    [countdowns, syncPaused, commitRemoval],
  );

  const addToast = useCallback(
    (toast: Toast) => {
      const toasts = toastsRef.current;
      const match = toasts.findIndex(({ id }) => id === toast.id) !== -1;

      function updateState(prev: Toast[]) {
        const match = prev.findIndex(({ id }) => id === toast.id) !== -1;

        if (match) {
          return prev.map((item) => (item.id === toast.id ? toast : item));
        }

        return [...prev, toast];
      }

      // Sync first, so a toast added while the page is hidden starts paused
      syncPaused();

      // An update replaces the toast's countdown, so it runs the new duration
      if (toast.duration) {
        countdowns.set(toast.id, toast.duration);
      } else {
        countdowns.clear(toast.id);
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
    },
    [countdowns, syncPaused],
  );

  useEffect(() => {
    document.addEventListener('visibilitychange', syncPaused);

    return () => {
      document.removeEventListener('visibilitychange', syncPaused);
    };
  }, [syncPaused]);

  // A removed toast fires no blur, so check where focus is after each change
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when toasts change
  useEffect(() => {
    focusWithinRef.current =
      stackRef.current?.contains(document.activeElement) ?? false;
    syncPaused();
  }, [toasts, syncPaused]);

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
        ref={stackRef}
      >
        {toasts.map(({ id, children, intent }) => (
          <Alert
            intent={intent}
            key={id}
            className={classnames(styles.toast, toastClassName)}
            style={{
              viewTransitionName: `toast-${id}`,
            }}
            onPointerEnter={() => {
              hoveredIdsRef.current.add(id);
              syncPaused();
            }}
            onPointerLeave={() => {
              hoveredIdsRef.current.delete(id);
              syncPaused();
            }}
            onFocus={() => {
              focusWithinRef.current = true;
              syncPaused();
            }}
            onBlur={(event) => {
              const stack = stackRef.current;

              // On a window blur focus stays put, so the toast keeps it
              focusWithinRef.current =
                !!stack &&
                (stack.contains(event.relatedTarget) ||
                  stack.contains(document.activeElement));
              syncPaused();
            }}
            endSlot={
              <IconButton
                label={closeLabel}
                variant="ghost"
                size="small"
                intent="neutral"
                onClick={() => {
                  removeToast(id);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            {children}
          </Alert>
        ))}
      </div>
    </>
  );
};
