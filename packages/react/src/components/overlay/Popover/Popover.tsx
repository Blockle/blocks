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

export type PoperoverAlign = 'top' | 'bottom' | 'left' | 'right';

export type PopoverProps = {
  anchorElement: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  onRequestClose: () => void;
  open: boolean;
  position?: PoperoverAlign; // TODO PoperoverAlign | PoperoverAlign[]; allow multiple positions
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
  const [xy, setXY] = useState({ x: 0, y: 0 });
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
      if (!element || !element.showPopover) {
        return;
      }

      element.showPopover();

      const [x, y] = getPopoverPosition(position, anchorElement, popoverRef);
      setXY({ x, y });

      // console.log('Popover position:', x, y);
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

  useEffect(() => {
    if (!open || !sticky) {
      return;
    }

    function handleResize() {
      const [x, y] = getPopoverPosition(position, anchorElement, popoverRef);

      setXY({ x, y });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
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
        left: xy.x,
        top: xy.y,
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
};
