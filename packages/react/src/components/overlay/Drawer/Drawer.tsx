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
import { DialogContext, useModalOverlay } from '../Dialog/dialogHelper.js';
import type { RequestCloseReason } from '../requestCloseReason.js';
import * as styles from './drawer.css.js';

type DrawerTheme = ComponentThemes['drawer'];

export type DrawerProps = {
  open: boolean;
  onRequestClose: (reason: RequestCloseReason) => void;
  /** Runs on a close request, before the component prevents it and asks to close */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
  className?: string;
  placement?: keyof typeof styles.placement;
  size?: DrawerTheme['variants']['size'];
} & HTMLElementProps<HTMLDialogElement>;

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onRequestClose,
  className,
  placement = 'left',
  size,
  children,
  ref,
  onKeyDown,
  onKeyDownCapture,
  onCancel,
  ...restProps
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const rootClassName = useComponentStyles('drawer', {
    root: true,
    variants: { placement, size },
  });

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? true : undefined;

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

  return (
    <DialogContext.Provider value={contextValue}>
      <dialog
        ref={composeRefs(ref, dialogRef)}
        open={dataOpen}
        className={classnames(
          styles.drawer,
          styles.placement[placement],
          rootClassName,
          className,
        )}
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

/* <nav aria-label="Primary site navigation">
  <button aria-controls="main-drawer" aria-expanded="false" aria-label="Open menu">
    Hamburger Icon
  </button>

  <div id="main-drawer" role="dialog" aria-labelledby="drawer-title" class="drawer-offscreen">
    <h2 id="drawer-title">Navigation Menu</h2>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about" aria-current="page">About</a></li>
      More links
    </ul>
    <button aria-label="Close menu">X</button>
  </div>
</nav> */
