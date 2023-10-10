import {
  AnimationEvent,
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLayer } from '../../hooks/useLayer';
import * as styles from './dialog.css';
import { useVisibilityState } from '../../hooks/useVisibilityState';
import { useFocusLock } from '../../hooks/useFocusLock';
import { useRestoreFocus } from '../../hooks/useRestoreFocus';
import { DialogContext, useNestedDialog } from './dialogHelper';
import { usePreventBodyScroll } from '../../hooks/usePreventBodyScroll';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Portal } from '../Portal';
import { Box } from '../Box';
import { classnames } from '../../lib/utils/classnames';
import { DialogTheme } from '../../lib/theme/themeComponents';

export type DialogProps = {
  children?: ReactNode;
  open: boolean;
  onRequestClose: () => void;
  className?: string;
  size?: DialogTheme['variants']['size'];
};

export const Dialog: FC<DialogProps> = ({ children, open, className, onRequestClose, size }) => {
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

  const onAnimationEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === styles.backdropLeaveAnimation) {
      event.stopPropagation();
      hide();
    }
  }, []);

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
  useEffect(() => {
    if (!open || !enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, enabled]);

  const backdropClassName = useComponentStyles('dialog', { backdrop: true }, false);
  const dialogClassName = useComponentStyles('dialog', { base: true, variants: { size } });

  if (!visible) {
    return null;
  }

  return (
    <Portal container={layer()}>
      <DialogContext.Provider value={{ setEnabled }}>
        <Box
          className={classnames(styles.backdrop, !open && styles.backdropLeave, backdropClassName)}
          display="flex"
          placeItems="center"
          onClick={onBackdropClick}
          onAnimationEnd={onAnimationEnd}
        >
          <Box
            ref={dialogRef}
            as="dialog"
            open
            className={classnames(
              styles.dialog,
              !open && styles.dialogLeave,
              dialogClassName,
              className,
            )}
          >
            {children}
          </Box>
        </Box>
      </DialogContext.Provider>
    </Portal>
  );
};
