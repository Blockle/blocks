'use client';

import { atoms, classnames, type ToastPlacement } from '@blockle/blocks-core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';
import { useTopModal } from '../../../hooks/useModalDialog/modalStack.js';
import { useTheme } from '../../../hooks/useTheme/useTheme.js';
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

type MovableParent = Element & {
  moveBefore?: (node: Node, child: Node | null) => void;
};

/**
 * Appends `node` to `parent`, with moveBefore where the browser supports it,
 * which keeps its focus, animations and other state.
 */
function moveInto(parent: MovableParent, node: Element) {
  if (node.isConnected && parent.moveBefore) {
    parent.moveBefore(node, null);
  } else {
    parent.append(node);
  }
}

/**
 * Creates the element the toasts render in: a manual popover, so it is in the
 * top layer, kept in the topmost open modal <dialog>, or in the body when none
 * is open. Content outside an open modal is inert, so the stack has to be
 * inside it; it is shown again after each move, so it sits above the modal.
 *
 * The same element moves, so the toasts in it keep their DOM and are not
 * announced again. It stays shown while empty, so it is a live region before
 * the first toast is added.
 */
function useToastStack(modal: HTMLDialogElement | null, className: string) {
  const [stack, setStack] = useState<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const element = document.createElement('div');

    element.setAttribute('popover', 'manual');
    element.setAttribute('aria-live', 'polite');
    setStack(element);

    return () => {
      element.remove();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (stack) {
      stack.className = className;
    }
  }, [stack, className]);

  useIsomorphicLayoutEffect(() => {
    if (!stack) {
      return;
    }

    const container = modal ?? document.body;

    if (stack.parentNode !== container) {
      moveInto(container, stack);
    }

    // Showing it again puts it above everything else in the top layer
    stack.hidePopover();
    stack.showPopover();
  }, [stack, modal]);

  return stack;
}

type StackedToast = Toast & {
  /** Moved with the stack, so it no longer plays its entry animation */
  settled?: boolean;
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
  const rootClassName = useComponentStyles('toast', 'root', { placement });
  const toastClassName = useComponentStyles('toast', 'toast', { placement });
  const theme = useTheme();
  const [toasts, setToasts] = useState<StackedToast[]>([]);
  const toastsRef = useRef<Toast[]>(toasts);
  toastsRef.current = toasts;

  const modal = useTopModal();
  const [prevModal, setPrevModal] = useState(modal);

  // A toast that moves with the stack is settled: without moveBefore, moving
  // restarts animations, and its entry animation must not play again. A toast
  // added in the same render as a move is settled too, and enters without it.
  if (modal !== prevModal) {
    setPrevModal(modal);
    setToasts((prev) => prev.map((toast) => ({ ...toast, settled: true })));
  }

  const stack = useToastStack(
    modal,
    classnames(
      theme.vars,
      atoms({ fontFamily: 'body' }),
      styles.stack,
      styles.placement[placement],
      rootClassName,
    ) ?? '',
  );

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

      function updateState(prev: StackedToast[]) {
        const match = prev.findIndex(({ id }) => id === toast.id) !== -1;

        if (match) {
          return prev.map((item) =>
            item.id === toast.id ? { ...toast, settled: item.settled } : item,
          );
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
    focusWithinRef.current = stack?.contains(document.activeElement) ?? false;
    syncPaused();
  }, [toasts, stack, syncPaused]);

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

      {stack &&
        createPortal(
          toasts.map(({ id, children, intent, settled }) => (
            <Alert
              intent={intent}
              // Polite, unless something went wrong
              role={intent === 'danger' ? 'alert' : 'status'}
              key={id}
              className={classnames(styles.toast, toastClassName)}
              style={{
                viewTransitionName: `toast-${id}`,
                animationName: settled ? 'none' : undefined,
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
          )),
          stack,
        )}
    </>
  );
};
