import {
  type HTMLElementProps,
  classnames,
  hasAnimationDuration,
} from '@blockle/blocks-core';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useLayer } from '../../../hooks/useLayer';
import { useVisibilityState } from '../../../hooks/useVisibilityState';
import { Box } from '../../layout/Box';
import { Portal } from '../Portal';
import { getPopoverPosition } from './popover-utils';

export type PopoverProps = {
  // Preferred alignment of the popover, will mirror if there is not enough space
  align?: 'top' | 'bottom' | 'left' | 'right';
  anchorElement: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  onRequestClose: () => void;
  open: boolean;
  repositionOnScroll?: boolean;
  style?: React.CSSProperties;
} & HTMLElementProps<HTMLDivElement>;

export const Popover: React.FC<PopoverProps> = ({
  align = 'bottom',
  anchorElement,
  children,
  className,
  onRequestClose,
  open,
  repositionOnScroll,
  style,
  ...restProps
}) => {
  const layer = useLayer();
  const [visible, hide] = useVisibilityState(open);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerClassName = useComponentStyles(
    'popover',
    { base: true },
    false,
  );

  useLayoutEffect(() => {
    if (!visible) {
      return;
    }

    const position = getPopoverPosition(align, anchorElement, popoverRef);

    setPosition({ x: position[0], y: position[1] });
  }, [align, anchorElement, visible]);

  useEffect(() => {
    if (!open || !repositionOnScroll) {
      return;
    }

    function handleResize() {
      const position = getPopoverPosition(align, anchorElement, popoverRef);

      setPosition({ x: position[0], y: position[1] });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [align, anchorElement, open, repositionOnScroll]);

  // "workaround" so transition works on first render
  useIsomorphicLayoutEffect(() => {
    if (!open) {
      popoverRef.current?.removeAttribute('data-open');
      return;
    }

    let timer = requestAnimationFrame(() => {
      timer = requestAnimationFrame(() => {
        popoverRef.current?.setAttribute('data-open', '');
      });
    });

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [open, visible]);

  // Hide the popover when the animation ends
  const onAnimationEnd = useCallback(() => {
    if (!open) {
      hide();
    }
  }, [hide, open]);

  // Hide the popover immediately when the open prop changes to false
  // and no animation is used
  useEffect(() => {
    if (open) {
      return;
    }

    // If the popover has no transition, hide it immediately
    if (!hasAnimationDuration(popoverRef.current)) {
      hide();
    }
  }, [hide, open]);

  // On Escape key press, close the popover
  useKeyboard('Escape', onRequestClose, { enabled: visible });

  // Close the popover when clicking outside of it
  useClickOutside(popoverRef, onRequestClose, { enabled: visible });

  if (!visible) {
    return null;
  }

  // SSR: If the popover is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? '' : undefined;

  return (
    <Portal container={layer()}>
      <Box
        ref={popoverRef}
        data-open={dataOpen}
        onAnimationEnd={onAnimationEnd}
        onTransitionEnd={onAnimationEnd}
        className={classnames(containerClassName, className)}
        position="absolute"
        style={{
          ...style,
          left: position.x,
          top: position.y,
        }}
        {...restProps}
      >
        {children}
      </Box>
    </Portal>
  );
};
