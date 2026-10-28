'use client';

import {
  type ComponentThemes,
  classnames,
  composeRefs,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import { useCallback, useRef } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside.js';
import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { useKeyboard } from '../../../hooks/useKeyboard/useKeyboard.js';
import { useModalDialog } from '../../../hooks/useModalDialog/useModalDialog.js';
import { usePreventBodyScroll } from '../../../hooks/usePreventBodyScroll/usePreventBodyScroll.js';
import { useRestoreFocus } from '../../../hooks/useRestoreFocus/useRestoreFocus.js';
import * as styles from './drawer.css.js';

type DrawerTheme = ComponentThemes['drawer'];

export type DrawerProps = {
  open: boolean;
  onRequestClose: () => void;
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
  ...restProps
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const rootClassName = useComponentStyles('drawer', {
    root: true,
    variants: { placement, size },
  });

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? true : undefined;

  // Store the previous active element and restore it when the drawer is closed
  useRestoreFocus(open);

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

  const { visible, onAnimationEnd } = useModalDialog(dialogRef, open);

  if (!visible) {
    return null;
  }

  return (
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
