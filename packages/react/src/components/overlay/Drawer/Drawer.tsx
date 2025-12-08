import {
  classnames,
  type HTMLElementProps,
  hasAnimationDuration,
} from '@blockle/blocks-core';
import { useCallback, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside.js';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';
import { useKeyboard } from '../../../hooks/useKeyboard/useKeyboard.js';
import { usePreventBodyScroll } from '../../../hooks/usePreventBodyScroll/usePreventBodyScroll.js';
import * as styles from './drawer.css.js';

export type DrawerProps = {
  open: boolean;
  onRequestClose: () => void;
  placement?: keyof typeof styles.placement;
  children?: React.ReactNode;
} & HTMLElementProps<HTMLDialogElement>;

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onRequestClose,
  placement = 'left',
  children,
  ...restProps
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(open);

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? true : undefined;

  // Diable hook for nested dialogs, top level dialog already handles this
  usePreventBodyScroll(open);

  // Close the dialog when clicking outside of it
  useClickOutside(dialogRef, onRequestClose, { enabled: open });

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
  useKeyboard('Escape', onEscape, { enabled: open });

  useIsomorphicLayoutEffect(() => {
    // Using an addional state to control the visibility of the dialog
    if (open && visible) {
      if (!dialogRef.current || !dialogRef.current.showModal) {
        return;
      }

      dialogRef.current.showModal();
    } else if (open) {
      setVisible(true);
    } else {
      // If the dialog has no animation duration, we hide it immediately
      if (!hasAnimationDuration(dialogRef.current)) {
        setVisible(false);
      }

      if (dialogRef.current?.close) {
        // Close the dialog
        dialogRef.current.close();
      }
    }
  }, [open, visible]);

  const onAnimationEnd = useCallback(() => {
    if (!open) {
      setVisible(false);
    }
  }, [open]);

  if (!visible) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      open={dataOpen}
      className={classnames(styles.drawer, styles.placement[placement])}
      onAnimationEnd={onAnimationEnd}
      onTransitionEnd={onAnimationEnd}
      {...restProps}
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
