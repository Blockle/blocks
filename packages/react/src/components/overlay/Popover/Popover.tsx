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
  /**
   * @deprecated Has no effect, an open popover always keeps its layout up to
   * date
   */
  sticky?: boolean;
  /**
   * Caps the popover's height to the room on the side it opens on, so a tall
   * popover stops at the viewport's edge. Give it `overflow: auto` to scroll.
   */
  limitHeight?: boolean;
  // trigger?: 'click' | 'hover' | 'focus'; // TODO: implement
} & HTMLElementProps<HTMLDivElement>;

function toPx(value: number | undefined) {
  return value === undefined ? '' : `${value}px`;
}

// Matches the layout the render applies through `style`
function applyLayout(element: HTMLElement, layout: PopoverLayout) {
  element.style.left = toPx(layout.x);
  element.style.top = toPx(layout.y);
  element.style.maxWidth = toPx(layout.maxWidth);
  element.style.maxHeight = toPx(layout.maxHeight);
}

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
  sticky: _sticky,
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

      const nextLayout = getPopoverLayout(
        placement,
        anchorElement,
        popoverRef,
        limitHeight,
      );

      // Content's effects run before the render that applies this layout, and
      // one that moves focus would scroll the page to wherever the popover
      // still is, or to an item past its height cap. Lay it out now, before
      // they run.
      applyLayout(element, nextLayout);
      setLayout(nextLayout);
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

  // Keep the layout up to date while open. A change to the placement, the
  // page, an ancestor's scroll position or either element's size re-runs the
  // whole layout, batched to one update per animation frame. The layout it
  // sets can resize the popover, which stays quiet as long as the layout is
  // unchanged.
  useEffect(() => {
    if (!open || !visible) {
      return;
    }

    let frame = 0;

    function updateLayout() {
      frame = 0;

      if (!popoverRef.current) {
        return;
      }

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
          prev.maxWidth === next.maxWidth &&
          prev.maxHeight === next.maxHeight
        ) {
          return prev;
        }

        return next;
      });
    }

    function scheduleLayoutUpdate() {
      if (!frame) {
        frame = requestAnimationFrame(updateLayout);
      }
    }

    // Scrolling the popover's own content doesn't move anything
    function onScroll(event: Event) {
      if (
        event.target instanceof Node &&
        popoverRef.current?.contains(event.target)
      ) {
        return;
      }

      scheduleLayoutUpdate();
    }

    // The placement, anchor or height cap changed
    updateLayout();

    const { visualViewport } = window;
    // Not every environment has it, jsdom for one
    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(scheduleLayoutUpdate);

    if (anchorElement.current) {
      observer?.observe(anchorElement.current);
    }

    if (popoverRef.current) {
      observer?.observe(popoverRef.current);
    }

    window.addEventListener('resize', scheduleLayoutUpdate);
    // Scroll events don't bubble, but capturing catches any element's
    document.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });
    visualViewport?.addEventListener('resize', scheduleLayoutUpdate);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', scheduleLayoutUpdate);
      document.removeEventListener('scroll', onScroll, { capture: true });
      visualViewport?.removeEventListener('resize', scheduleLayoutUpdate);
    };
  }, [open, visible, placement, anchorElement, limitHeight]);

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
        maxWidth: layout.maxWidth,
        maxHeight: layout.maxHeight,
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
};
