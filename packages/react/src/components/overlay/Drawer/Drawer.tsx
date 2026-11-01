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
import { useModalOverlay } from '../useModalOverlay.js';
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
} & Omit<HTMLElementProps<HTMLDialogElement>, 'size'>;

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

  const closeRequestProps = useModalOverlay(dialogRef, {
    open,
    onRequestClose,
    onKeyDown,
    onKeyDownCapture,
    onCancel,
  });

  const { visible, onAnimationEnd, openAttribute } = useModalDialog(
    dialogRef,
    open,
  );

  if (!visible) {
    return null;
  }

  return (
    <dialog
      ref={composeRefs(ref, dialogRef)}
      open={openAttribute}
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
