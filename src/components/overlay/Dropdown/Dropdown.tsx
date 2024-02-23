import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { useKeyboard } from '../../../hooks/useKeyboard';
import { useLayer } from '../../../hooks/useLayer';
import { useVisibilityState } from '../../../hooks/useVisibilityState';
import { DropdownTheme } from '../../../lib/theme/componentThemes';
import { classnames } from '../../../lib/utils/classnames';
import { hasAnimationDuration } from '../../../lib/utils/dom';
import { Box } from '../../layout/Box';
import { Portal } from '../../other/Portal';
import { getDropdownPosition } from './dropdown-utils';

export type DropdownProps = {
  align?: 'top' | 'bottom' | 'left' | 'right'; // Preferred alignment of the dropdown, will mirror if there is not enough space
  anchorElement: React.RefObject<HTMLElement>; // HTMLElements or CSS selectors
  children: React.ReactNode;
  className?: string;
  onRequestClose: () => void;
  open: boolean;
  repositionOnScroll?: boolean;
  style?: React.CSSProperties;
  variant?: DropdownTheme['variants']['variant'];
};

// TODO Close on outside click
export const Dropdown: React.FC<DropdownProps> = ({
  align = 'bottom',
  anchorElement,
  children,
  className,
  onRequestClose,
  open,
  repositionOnScroll,
  style,
  variant,
}) => {
  const layer = useLayer();
  const [visible, hide] = useVisibilityState(open);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerClassName = useComponentStyles(
    'dropdown',
    { base: true, variants: { variant } },
    false,
  );

  useLayoutEffect(() => {
    if (!visible) {
      return;
    }

    const position = getDropdownPosition(align, anchorElement, dropdownRef);

    setPosition({ x: position[0], y: position[1] });
  }, [align, anchorElement, visible]);

  useEffect(() => {
    if (!open || !repositionOnScroll) {
      return;
    }

    function handleResize() {
      const position = getDropdownPosition(align, anchorElement, dropdownRef);

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
      dropdownRef.current?.removeAttribute('data-open');
      return;
    }

    let timer = requestAnimationFrame(() => {
      timer = requestAnimationFrame(() => {
        dropdownRef.current?.setAttribute('data-open', '');
      });
    });

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [open, visible]);

  // Hide the dropdown when the animation ends
  const onAnimationEnd = useCallback(() => {
    if (!open) {
      hide();
    }
  }, [hide, open]);

  // Hide the dropdown immediately when the open prop changes to false
  // and no animation is used
  useEffect(() => {
    if (open) {
      return;
    }

    // If the dropdown has no transition, hide it immediately
    if (!hasAnimationDuration(dropdownRef.current)) {
      hide();
    }
  }, [hide, open]);

  // On Escape key press, close the dropdown
  useKeyboard('Escape', onRequestClose, { enabled: visible });

  // Close the dropdown when clicking outside of it
  useClickOutside(dropdownRef, onRequestClose, { enabled: visible });

  if (!visible) {
    return null;
  }

  // SSR: If the dropdown is open on the server, we need to render it with the open attribute
  const dataOpen = typeof window === 'undefined' && open ? '' : undefined;

  return (
    <Portal container={layer()}>
      <Box
        ref={dropdownRef}
        data-open={dataOpen}
        onAnimationEnd={onAnimationEnd}
        onTransitionEnd={onAnimationEnd}
        className={classnames(containerClassName, className)}
        position="absolute"
        style={{
          ...style,
          // TODO Think about how to handle this, perhaps we could add a custom class to the dropdown
          // Or we remove it from getDropdownPosition?
          // "horizontal" ? "vertical"
          margin: align === 'bottom' || align === 'top' ? 'var(--spacing) 0' : '0 var(--spacing)',
          left: position.x,
          top: position.y,
        }}
      >
        {children}
      </Box>
    </Portal>
  );
};
