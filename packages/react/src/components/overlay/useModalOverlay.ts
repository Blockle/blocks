'use client';

import { useRef } from 'react';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside.js';
import { usePreventBodyScroll } from '../../hooks/usePreventBodyScroll/usePreventBodyScroll.js';
import { useRestoreFocus } from '../../hooks/useRestoreFocus/useRestoreFocus.js';
import { useIsTopModalOverlay } from './modalOverlayStack.js';
import type { RequestCloseReason } from './requestCloseReason.js';

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
  // The current Escape keydown, until it reaches the dialog
  const stoppedEscapeRef = useRef<KeyboardEvent | null>(null);

  const handleKeyDownCapture = (
    event: React.KeyboardEvent<HTMLDialogElement>,
  ) => {
    onKeyDownCapture?.(event);

    stoppedEscapeRef.current =
      event.key === 'Escape' ? event.nativeEvent : null;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    onKeyDown?.(event);

    if (event.key !== 'Escape') {
      return;
    }

    stoppedEscapeRef.current = null;

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

    // An Escape that content stopped is claimed, so is the cancel it causes.
    // A prevented Escape causes none, so a cancel after it is a new request.
    const stoppedEscape = stoppedEscapeRef.current;
    const claimed = stoppedEscape !== null && !stoppedEscape.defaultPrevented;

    stoppedEscapeRef.current = null;

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
 * Only the modal overlay opened last handles Escape and clicks outside, so a
 * click in a Dialog or Drawer does not close the ones below it, whether it is
 * nested in them or mounted elsewhere.
 */
export const useModalOverlay = (
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  { open, onRequestClose, ...handlers }: UseModalOverlayOptions,
) => {
  // Store the previous active element and restore it when closed
  useRestoreFocus(open);

  usePreventBodyScroll(open);

  const isTop = useIsTopModalOverlay(open);
  const enabled = open && isTop;

  useClickOutside(dialogRef, () => onRequestClose('outside-click'), {
    enabled,
  });

  return useDialogCloseRequests({ enabled, onRequestClose, ...handlers });
};
