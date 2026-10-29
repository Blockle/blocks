'use client';

import {
  classnames,
  composeRefs,
  type HTMLElementProps,
  hasAnimationDuration,
} from '@blockle/blocks-core';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside.js';
import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';
import { useKeyboard } from '../../../hooks/useKeyboard/useKeyboard.js';
import { Box } from '../../layout/Box/Box.js';
import type { RequestCloseReason } from '../requestCloseReason.js';
import { getPopoverPosition, type PopoverPlacement } from './popover-utils.js';

export type { PopoverPlacement };

// TODO Refactor with CSS anchor positioning

export type PopoverProps = {
  anchorElement: React.RefObject<HTMLElement | null>;
  onRequestClose: (reason: RequestCloseReason) => void;
  open: boolean;
  /**
   * Side of the anchor to open on, and which of its edges to line up with.
   * Flips to the opposite side when there is no room, and shifts to stay
   * inside the viewport.
   * @default 'top'
   */
  placement?: PopoverPlacement;
  /**
   * @deprecated Use `placement`, which wins when both are passed
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  sticky?: boolean;
  // trigger?: 'click' | 'hover' | 'focus'; // TODO: implement
} & HTMLElementProps<HTMLDivElement>;

export const Popover: React.FC<PopoverProps> = ({
  anchorElement,
  children,
  className,
  onRequestClose,
  open,
  placement: placementProp,
  position,
  sticky,
  style,
  ...restProps
}) => {
  const placement = placementProp ?? position ?? 'top';
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(open);

  const popoverClassName = useComponentStyles('popover', { root: true }, false);

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      // Content claimed this Escape
      if (event.defaultPrevented) {
        return;
      }

      event.preventDefault();
      onRequestClose('escape');
    },
    [onRequestClose],
  );

  // Focus often stays on the anchor, so listen for Escape on the document
  useKeyboard('Escape', onEscape, { enabled: open });

  // Close the popover when clicking outside of it
  useClickOutside(popoverRef, () => onRequestClose('outside-click'), {
    enabled: open,
  });

  useIsomorphicLayoutEffect(() => {
    const element = popoverRef.current;

    // Using an addional state to control the visibility of the dialog
    if (open && visible) {
      if (!element || typeof element.showPopover !== 'function') {
        console.warn(
          'Popover: showPopover method is not available on the element.',
        );
        return;
      }

      element.showPopover();

      const [x, y] = getPopoverPosition(placement, anchorElement, popoverRef);
      setPopoverPosition({ x, y });
    } else if (open) {
      setVisible(true);
    } else {
      // If the popover has no animation duration, we hide it immediately
      if (!hasAnimationDuration(popoverRef.current)) {
        setVisible(false);
      }

      if (!element) {
        return;
      }

      if (typeof element.hidePopover !== 'function') {
        console.warn(
          'Popover: hidePopover method is not available on the element.',
        );
        return;
      }

      element.hidePopover();
    }
  }, [open, visible]);

  // Update the popover position when the anchor element or placement changes
  useEffect(() => {
    if (open) {
      const [x, y] = getPopoverPosition(placement, anchorElement, popoverRef);
      setPopoverPosition({ x, y });
    }
  }, [open, anchorElement, placement]);

  // Update the popover position when the window is resized or scrolled
  // and the popover is sticky
  useEffect(() => {
    if (!open || !sticky) {
      return;
    }

    function updatePopoverPosition() {
      const [x, y] = getPopoverPosition(placement, anchorElement, popoverRef);

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
  }, [placement, anchorElement, open, sticky]);

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
      ref={composeRefs(restProps.ref, popoverRef)}
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
