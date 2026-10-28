'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside.js';
import { usePreventBodyScroll } from '../../../hooks/usePreventBodyScroll/usePreventBodyScroll.js';
import { useRestoreFocus } from '../../../hooks/useRestoreFocus/useRestoreFocus.js';
import type { RequestCloseReason } from '../requestCloseReason.js';

type DialogContextValue = {
  setEnabled: (active: boolean) => void;
};

export const DialogContext = createContext<DialogContextValue | undefined>(
  undefined,
);

export const useNestedDialog = (open: boolean): boolean => {
  const parentDialog = useContext(DialogContext);

  useEffect(() => {
    if (!parentDialog || !open) {
      return;
    }

    parentDialog.setEnabled(false);

    return () => {
      parentDialog.setEnabled(true);
    };
  }, [parentDialog, open]);

  return !!parentDialog;
};

type UseDialogCloseRequestsOptions = {
  enabled: boolean;
  onRequestClose: (reason: RequestCloseReason) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLDialogElement>;
  onKeyDownCapture?: React.KeyboardEventHandler<HTMLDialogElement>;
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
};

/**
 * Turns an Escape, or another close request such as the Android back gesture,
 * on a modal <dialog> into a close request, and keeps the dialog from closing
 * natively.
 *
 * Escape is handled on the dialog itself, after its content, so content can
 * claim an Escape with stopPropagation() or preventDefault().
 */
const useDialogCloseRequests = ({
  enabled,
  onRequestClose,
  onKeyDown,
  onKeyDownCapture,
  onCancel,
}: UseDialogCloseRequestsOptions) => {
  // Whether the current Escape keydown was stopped before reaching the dialog
  const escapeStoppedRef = useRef(false);

  const handleKeyDownCapture = (
    event: React.KeyboardEvent<HTMLDialogElement>,
  ) => {
    onKeyDownCapture?.(event);

    // Cleared again when the keydown reaches the dialog
    escapeStoppedRef.current = event.key === 'Escape';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    onKeyDown?.(event);

    if (event.key !== 'Escape') {
      return;
    }

    escapeStoppedRef.current = false;

    if (!enabled || event.defaultPrevented) {
      return;
    }

    // An unprevented Escape makes the browser close the dialog, prevent it so
    // the app decides
    event.preventDefault();
    onRequestClose('escape');
  };

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    onCancel?.(event);

    // React passes the cancel of a nested dialog on to its parents
    if (event.target !== event.currentTarget) {
      return;
    }

    event.preventDefault();

    // The cancel of an Escape that content stopped, it claimed that Escape
    const claimed = escapeStoppedRef.current;

    escapeStoppedRef.current = false;

    if (enabled && !claimed) {
      onRequestClose('escape');
    }
  };

  return {
    onKeyDown: handleKeyDown,
    onKeyDownCapture: handleKeyDownCapture,
    onCancel: handleCancel,
  };
};

type UseModalOverlayOptions = Omit<UseDialogCloseRequestsOptions, 'enabled'> & {
  open: boolean;
};

/**
 * The behaviour Dialog and Drawer share while open: focus is restored when
 * closed, the body does not scroll, and an Escape, close request or click
 * outside requests to close.
 *
 * While a nested Dialog or Drawer is open, the outer one ignores Escape and
 * clicks outside, and leaves the body scroll lock to the outermost one.
 * Provide `contextValue` through DialogContext to the dialog's content.
 */
export const useModalOverlay = (
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  { open, onRequestClose, ...handlers }: UseModalOverlayOptions,
) => {
  const [enabled, setEnabled] = useState(true);
  const [contextValue] = useState<DialogContextValue>(() => ({ setEnabled }));

  // Store the previous active element and restore it when closed
  useRestoreFocus(open);

  // Disable functionality of parent dialogs and return boolean if this dialog is nested
  const isNested = useNestedDialog(open);

  // The outermost dialog already prevents the body from scrolling
  usePreventBodyScroll(open && !isNested);

  useClickOutside(dialogRef, () => onRequestClose('outside-click'), {
    enabled: open && enabled,
  });

  const closeRequestProps = useDialogCloseRequests({
    enabled: open && enabled,
    onRequestClose,
    ...handlers,
  });

  return { contextValue, closeRequestProps };
};
