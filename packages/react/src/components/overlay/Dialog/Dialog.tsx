'use client';

import {
  type ComponentThemes,
  classnames,
  composeRefs,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import { useRef } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { useModalDialog } from '../../../hooks/useModalDialog/useModalDialog.js';
import type { RequestCloseReason } from '../requestCloseReason.js';
import * as styles from './dialog.css.js';
import { DialogContext, useModalOverlay } from './dialogHelper.js';

type DialogTheme = ComponentThemes['dialog'];

export type DialogProps = {
  open: boolean;
  onRequestClose: (reason: RequestCloseReason) => void;
  /** Runs on a close request, before the component prevents it and asks to close */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
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
  onKeyDown,
  onKeyDownCapture,
  onCancel,
  ...restProps
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogClassName = useComponentStyles('dialog', {
    dialog: true,
    variants: { size },
  });

  const { contextValue, closeRequestProps } = useModalOverlay(dialogRef, {
    open,
    onRequestClose,
    onKeyDown,
    onKeyDownCapture,
    onCancel,
  });

  const { visible, onAnimationEnd } = useModalDialog(dialogRef, open);

  if (!visible) {
    return null;
  }

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? true : undefined;

  return (
    <DialogContext.Provider value={contextValue}>
      <dialog
        ref={composeRefs(ref, dialogRef)}
        open={dataOpen}
        className={classnames(styles.dialog, dialogClassName, className)}
        onAnimationEnd={onAnimationEnd}
        onTransitionEnd={onAnimationEnd}
        {...restProps}
        {...closeRequestProps}
      >
        {children}
      </dialog>
    </DialogContext.Provider>
  );
};
