import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { useFocusLock } from '../../hooks/useFocusLock';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useLayer } from '../../hooks/useLayer';
import { usePreventBodyScroll } from '../../hooks/usePreventBodyScroll';
import { useRestoreFocus } from '../../hooks/useRestoreFocus';
import { useVisibilityState } from '../../hooks/useVisibilityState';
import { DialogTheme } from '../../lib/theme/componentThemes';
import { classnames } from '../../lib/utils/classnames';
import { hasAnimationDuration } from '../../lib/utils/dom';
import { Box } from '../Box';
import { Portal } from '../Portal';
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

// TODO Can we use inert attribute? For example set it on the root element of the page
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert
export const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  className,
  onRequestClose,
  size,
  ...restProps
}) => {
  const backdropClassName = useComponentStyles('dialog', { backdrop: true }, false);
  const dialogClassName = useComponentStyles('dialog', { dialog: true, variants: { size } });
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const layer = useLayer();
  const [visible, hide] = useVisibilityState(open);
  const [enabled, setEnabled] = useState(true);

  // On outside click, close the dialog
  const onBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        onRequestClose();
      }
    },
    [onRequestClose],
  );

  // Trap focus inside the dialog
  useFocusLock({ ref: dialogRef, active: open && enabled });

  // Store the previous active element and restore it when the dialog is closed
  useRestoreFocus(open);

  // Disable functionality of parent dialogs and return boolean if this dialog is nested
  const isNested = useNestedDialog(visible);

  // Prevent body scroll when dialog is open
  // Diable hook for nested dialogs, top level dialog already handles this
  usePreventBodyScroll(visible && !isNested);

  // On Escape key press, close the dialog
  useKeyboard('Escape', onRequestClose, { enabled: open && enabled });

  // The DOM element of the dialog is not rendered when it is not open
  // This causes a problem when we want to animate the dialog with transitions
  // To solve this, we use two rAF's to make sure the data-open attribute is set
  // after the dialog DOM is rendered
  // And why do we use this?
  // Because we want to animate the dialog with CSS transitions. This way transitions
  // can be used and the dialog can be animated in and out
  useIsomorphicLayoutEffect(() => {
    if (!open) {
      backdropRef.current?.removeAttribute('data-open');
      dialogRef.current?.removeAttribute('data-open');
      return;
    }

    let timer = requestAnimationFrame(() => {
      timer = requestAnimationFrame(() => {
        backdropRef.current?.setAttribute('data-open', '');
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
  }, [open]);

  if (!visible) {
    return null;
  }

  // SSR: If the dialog is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? '' : undefined;

  return (
    <Portal container={layer()}>
      {/* Portals render outside the "root", so make sure to wrap our dialog within the theme provider */}
      <DialogContext.Provider value={{ setEnabled }}>
        <Box
          ref={backdropRef}
          className={classnames(styles.backdrop, backdropClassName)}
          data-open={dataOpen}
          onClick={onBackdropClick}
          onAnimationEnd={onAnimationEnd}
          onTransitionEnd={onAnimationEnd}
        >
          <dialog
            ref={dialogRef}
            aria-modal="true"
            open
            data-open={dataOpen}
            className={classnames(dialogClassName, className)}
            {...restProps}
          >
            {children}
          </dialog>
        </Box>
      </DialogContext.Provider>
    </Portal>
  );
};
