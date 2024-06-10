import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useLayer } from '../../../hooks/useLayer';
import { usePreventBodyScroll } from '../../../hooks/usePreventBodyScroll';
import { useRestoreFocus } from '../../../hooks/useRestoreFocus';
import { useVisibilityState } from '../../../hooks/useVisibilityState';
import { DialogTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { hasAnimationDuration } from '../../../lib/utils/dom';
import { Portal } from '../../other/Portal';
import * as styles from './dialog.css';
import { DialogContext, useNestedDialog } from './dialogHelper';

export type DialogProps = {
  children?: React.ReactNode;
  open: boolean;
  onRequestClose: () => void;
  className?: string;
  size?: DialogTheme['variants']['size'];
  'aria-label'?: string;
};

export const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  className,
  onRequestClose,
  size,
  ...restProps
}) => {
  const dialogClassName = useComponentStyles('dialog', { dialog: true, variants: { size } });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const layer = useLayer();
  const [visible, hide] = useVisibilityState(open);
  const [enabled, setEnabled] = useState(true);

  // Store the previous active element and restore it when the dialog is closed
  useRestoreFocus(open);

  // Disable functionality of parent dialogs and return boolean if this dialog is nested
  const isNested = useNestedDialog(visible);

  // Diable hook for nested dialogs, top level dialog already handles this
  usePreventBodyScroll(visible && !isNested);

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      // Native dialog closes on Escape key press
      // Prevent this, so we can handle it ourselves
      event.preventDefault();

      onRequestClose();
    },
    [onRequestClose],
  );

  // On Escape key press, close the dialog
  useKeyboard('Escape', onEscape, { enabled: open && enabled });

  // Close the dialog when clicking outside of it
  useClickOutside(dialogRef, onRequestClose, { enabled: open && enabled });

  useIsomorphicLayoutEffect(() => {
    if (!visible) {
      dialogRef.current?.close();
    }

    if (!open) {
      dialogRef.current?.removeAttribute('data-open');
      return;
    }

    // Use a double requestAnimationFrame to ensure transitions are applied
    let timer = requestAnimationFrame(() => {
      timer = requestAnimationFrame(() => {
        dialogRef.current?.showModal();
        dialogRef.current?.setAttribute('data-open', '');
      });
    });

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [open, visible]);

  // Hide the dialog when the animation ends
  const onAnimationEnd = useCallback(() => {
    if (!open) {
      hide();
    }
  }, [hide, open]);

  // Hide the dialog immediately when the open prop changes to false
  // and no animation is used
  useEffect(() => {
    if (open) {
      return;
    }

    // If the dialog has no transition, hide it immediately
    if (!hasAnimationDuration(dialogRef.current)) {
      hide();
    }
  }, [hide, open]);

  if (!visible) {
    return null;
  }

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? '' : undefined;

  return (
    <Portal container={layer()}>
      {/* Portals render outside the "root", so make sure to wrap our dialog within the theme provider */}
      <DialogContext.Provider value={{ setEnabled }}>
        <dialog
          ref={dialogRef}
          aria-modal="true"
          data-open={dataOpen}
          className={classnames(styles.dialog, dialogClassName, className)}
          onAnimationEnd={onAnimationEnd}
          onTransitionEnd={onAnimationEnd}
          {...restProps}
        >
          {children}
        </dialog>
      </DialogContext.Provider>
    </Portal>
  );
};
