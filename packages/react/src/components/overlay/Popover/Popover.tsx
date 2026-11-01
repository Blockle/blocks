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
import {
  getPopoverLayout,
  type PopoverLayout,
  type PopoverPlacement,
} from './popover-utils.js';

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
  /**
   * Caps the popover's height to the room on the side it opens on, so a tall
   * popover stops at the viewport's edge. Give it `overflow: auto` to scroll.
   */
  limitHeight?: boolean;
  // trigger?: 'click' | 'hover' | 'focus'; // TODO: implement
} & HTMLElementProps<HTMLDivElement>;

export const Popover: React.FC<PopoverProps> = ({
  anchorElement,
  children,
  className,
  limitHeight = false,
  onRequestClose,
  open,
  placement: placementProp,
  position,
  ref,
  sticky,
  style,
  ...restProps
}) => {
  const placement = placementProp ?? position ?? 'top';
  const popoverRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<PopoverLayout>({ x: 0, y: 0 });
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

      setLayout(
        getPopoverLayout(placement, anchorElement, popoverRef, limitHeight),
      );
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
      setLayout(
        getPopoverLayout(placement, anchorElement, popoverRef, limitHeight),
      );
    }
  }, [open, anchorElement, placement, limitHeight]);

  // Update the popover position when the window is resized or scrolled
  // and the popover is sticky
  useEffect(() => {
    if (!open || !sticky) {
      return;
    }

    function updatePopoverPosition() {
      const next = getPopoverLayout(
        placement,
        anchorElement,
        popoverRef,
        limitHeight,
      );

      setLayout((prev) => {
        // Prevent unnecessary state updates
        if (
          prev.x === next.x &&
          prev.y === next.y &&
          prev.maxHeight === next.maxHeight
        ) {
          return prev;
        }

        return next;
      });
    }

    window.addEventListener('resize', updatePopoverPosition);
    window.addEventListener('scroll', updatePopoverPosition);

    return () => {
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition);
    };
  }, [placement, anchorElement, open, sticky, limitHeight]);

  // Unmount once the popover's own closing transition is over. A cancelled
  // transition never ends, but the popover is hidden all the same. A child's
  // transition or animation bubbles here too, and must not cut it short.
  const onClosingEnd = useCallback(
    (event: React.SyntheticEvent) => {
      if (!open && event.target === event.currentTarget) {
        setVisible(false);
      }
    },
    [open],
  );

  if (!visible) {
    return null;
  }

  return (
    <Box
      ref={composeRefs(ref, popoverRef)}
      data-open={open ? '' : undefined}
      popover="manual"
      className={classnames(popoverClassName, className)}
      position="absolute"
      onAnimationEnd={onClosingEnd}
      onTransitionEnd={onClosingEnd}
      onTransitionCancel={onClosingEnd}
      style={{
        ...style,
        left: layout.x,
        top: layout.y,
        maxHeight: layout.maxHeight,
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
};
