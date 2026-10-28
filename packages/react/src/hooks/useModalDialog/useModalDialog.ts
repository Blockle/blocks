'use client';

import { hasAnimationDuration } from '@blockle/blocks-core';
import { useCallback, useState } from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';

/**
 * Shows a <dialog> as modal while `open` is true, and keeps it rendered
 * (`visible`) until its closing animation has ended.
 *
 * The dialog also closes whenever the effect is cleaned up while open, such as
 * when React hides it in an <Activity> or unmounts it, so it never lingers in
 * the top layer. Revealing it again shows it as modal.
 */
export const useModalDialog = (
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  open: boolean,
) => {
  const [visible, setVisible] = useState(open);

  useIsomorphicLayoutEffect(() => {
    const dialog = dialogRef.current;

    // Using an additional state to control the visibility of the dialog
    if (open && visible) {
      if (!dialog?.showModal) {
        return;
      }

      // A server-rendered dialog is open, but not modal, after hydration.
      // showModal() throws on such a dialog, so close it first.
      if (dialog.open) {
        dialog.close();
      }

      dialog.showModal();

      return () => {
        dialog.close();
      };
    }

    if (open) {
      setVisible(true);

      return;
    }

    // If the dialog has no animation duration, we hide it immediately
    if (!hasAnimationDuration(dialog)) {
      setVisible(false);
    }

    dialog?.close?.();
  }, [open, visible]);

  const onAnimationEnd = useCallback(() => {
    if (!open) {
      setVisible(false);
    }
  }, [open]);

  return { visible, onAnimationEnd };
};
