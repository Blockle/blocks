import { useCallback, useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { usePreventBodyScroll } from '../../../hooks/usePreventBodyScroll';
import { useRestoreFocus } from '../../../hooks/useRestoreFocus';
import { DialogTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { hasAnimationDuration } from '../../../lib/utils/dom';
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
  const dialogClassName = useComponentStyles('dialog', {
    dialog: true,
    variants: { size },
  });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [visible, setVisible] = useState(open);

  // Store the previous active element and restore it when the dialog is closed
  useRestoreFocus(open);

  // Disable functionality of parent dialogs and return boolean if this dialog is nested
  const isNested = useNestedDialog(open);

  // Diable hook for nested dialogs, top level dialog already handles this
  usePreventBodyScroll(open && !isNested);

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
    // Using an addional state to control the visibility of the dialog
    if (open && visible) {
      dialogRef.current?.showModal();
    } else if (open) {
      setVisible(true);
    } else {
      // If the dialog has no animation duration, we need to manually hide it
      if (!hasAnimationDuration(dialogRef.current)) {
        setVisible(false);
      }

      dialogRef.current?.close();
    }
  }, [open, visible]);

  const onAnimationEnd = useCallback(() => {
    if (!open) {
      setVisible(false);
    }
  }, [setVisible, open]);

  if (!visible) {
    return null;
  }

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? true : undefined;

  return (
    <>
      <DialogContext.Provider value={{ setEnabled }}>
        <dialog
          ref={dialogRef}
          aria-modal="true"
          open={dataOpen}
          className={classnames(styles.dialog, dialogClassName, className)}
          onAnimationEnd={onAnimationEnd}
          onTransitionEnd={onAnimationEnd}
          {...restProps}
        >
          {children}
        </dialog>
      </DialogContext.Provider>
    </>
  );
};
