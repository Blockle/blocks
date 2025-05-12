'use client';

import {
  type HTMLElementProps,
  classnames,
  hasAnimationDuration,
} from '@blockle/blocks-core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { Box } from '../../layout/Box';
import { getPopoverPosition } from './popover-utils';

export type PopoverAlign = 'top' | 'bottom' | 'left' | 'right';

export type PopoverProps = {
  anchorElement: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  onRequestClose: () => void;
  open: boolean;
  position?: PopoverAlign; // TODO PopoverAlign | PopoverAlign[]; allow multiple positions
  sticky?: boolean;
  style?: React.CSSProperties;
  // trigger?: 'click' | 'hover' | 'focus'; // TODO: implement
} & HTMLElementProps<HTMLDivElement>;

export const Popover: React.FC<PopoverProps> = ({
  anchorElement,
  children,
  className,
  onRequestClose,
  open,
  position = 'top',
  sticky,
  style,
  ...restProps
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(open);

  const popoverClassName = useComponentStyles('popover', { base: true }, false);

  // On Escape key press, close the popover
  useKeyboard('Escape', onRequestClose, { enabled: open });

  // Close the popover when clicking outside of it
  useClickOutside(popoverRef, onRequestClose, { enabled: open });

  useIsomorphicLayoutEffect(() => {
    const element = popoverRef.current;

    // Using an addional state to control the visibility of the dialog
    if (open && visible) {
      if (!element || typeof element.showPopover !== 'function') {
        console.warn('Popover: showPopover method is not available on the element.');
        return;
      }

      element.showPopover();

      const [x, y] = getPopoverPosition(position, anchorElement, popoverRef);
      setPopoverPosition({ x, y });
    } else if (open) {
      setVisible(true);
    } else {
      // If the popover has no animation duration, we hide it immediately
      if (!hasAnimationDuration(popoverRef.current)) {
        setVisible(false);
      }

      popoverRef.current?.hidePopover();
    }
  }, [open, visible]);

  // Update the popover position when anchor element or position prop changes
  useEffect(() => {
    if (open) {
      const [x, y] = getPopoverPosition(position, anchorElement, popoverRef);
      setPopoverPosition({ x, y });
    }
  }, [open, anchorElement, position]);

  // Update the popover position when the window is resized or scrolled
  // and the popover is sticky
  useEffect(() => {
    if (!open || !sticky) {
      return;
    }

    function updatePopoverPosition() {
      const [x, y] = getPopoverPosition(position, anchorElement, popoverRef);

      setPopoverPosition((prev) => {
        // Prevent unnecessary state updates
        if (prev.x === x && prev.y === y) {
          return prev;
        }

        return { x, y };
      });
    }

    window.addEventListener('resize', updatePopoverPosition);
    window.addEventListener('scroll', updatePopoverPosition);

    return () => {
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition);
    };
  }, [position, anchorElement, open, sticky]);

  const onAnimationEnd = useCallback(() => {
    if (!open) {
      setVisible(false);
    }
  }, [open]);

  if (!visible) {
    return null;
  }

  return (
    <Box
      ref={popoverRef}
      data-open={open ? '' : undefined}
      popover="manual"
      className={classnames(popoverClassName, className)}
      position="absolute"
      onAnimationEnd={onAnimationEnd}
      onTransitionEnd={onAnimationEnd}
      style={{
        ...style,
        left: popoverPosition.x,
        top: popoverPosition.y,
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
};
