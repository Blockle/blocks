'use client';

import {
  type ComponentThemes,
  classnames,
  composeRefs,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import { useCallback, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside.js';
import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { useKeyboard } from '../../../hooks/useKeyboard/useKeyboard.js';
import { useModalDialog } from '../../../hooks/useModalDialog/useModalDialog.js';
import { usePreventBodyScroll } from '../../../hooks/usePreventBodyScroll/usePreventBodyScroll.js';
import { useRestoreFocus } from '../../../hooks/useRestoreFocus/useRestoreFocus.js';
import * as styles from './dialog.css.js';
import { DialogContext, useNestedDialog } from './dialogHelper.js';

type DialogTheme = ComponentThemes['dialog'];

export type DialogProps = {
  open: boolean;
  onRequestClose: () => void;
  className?: string;
  size?: DialogTheme['variants']['size'];
  'aria-label'?: string;
} & HTMLElementProps<HTMLDialogElement>;

export const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  className,
  onRequestClose,
  size,
  ref,
  ...restProps
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogClassName = useComponentStyles('dialog', {
    dialog: true,
    variants: { size },
  });

  const [enabled, setEnabled] = useState(true);

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

  const { visible, onAnimationEnd } = useModalDialog(dialogRef, open);

  if (!visible) {
    return null;
  }

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? true : undefined;

  return (
    <DialogContext.Provider value={{ setEnabled }}>
      <dialog
        ref={composeRefs(ref, dialogRef)}
        open={dataOpen}
        className={classnames(styles.dialog, dialogClassName, className)}
        onAnimationEnd={onAnimationEnd}
        onTransitionEnd={onAnimationEnd}
        {...restProps}
      >
        {children}
      </dialog>
    </DialogContext.Provider>
  );
};
