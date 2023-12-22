import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLayer } from '../../hooks/useLayer';
import { Box } from '../Box';
import { Portal } from '../Portal';

type DropdownPositions = [x: number, y: number];

function getDropdownPosition(
  align: 'top' | 'bottom' | 'left' | 'right',
  anchorRef: React.RefObject<HTMLElement>,
  dropdownRef: React.RefObject<HTMLElement>,
): DropdownPositions {
  if (!anchorRef.current || !dropdownRef.current) {
    return [0, 0];
  }

  // Get the measurements of the anchor and dropdown
  const anchorRect = anchorRef.current.getBoundingClientRect();
  const dropdownRect = dropdownRef.current.getBoundingClientRect();
  const dropdownStyles = getComputedStyle(dropdownRef.current);

  const marginTop = Number.parseFloat(dropdownStyles.getPropertyValue('margin-top'));
  const marginRight = Number.parseFloat(dropdownStyles.getPropertyValue('margin-right'));
  const marginBottom = Number.parseFloat(dropdownStyles.getPropertyValue('margin-bottom'));
  const marginLeft = Number.parseFloat(dropdownStyles.getPropertyValue('margin-left'));
  const marginY = marginTop + marginBottom;
  const marginX = marginRight + marginLeft;

  const docHeight = document.documentElement.clientHeight;
  const docWidth = document.documentElement.clientWidth;
  const docScrollTop = document.documentElement.scrollTop;
  const docScrollLeft = document.documentElement.scrollLeft;

  // KEK
  const anchorLeft = anchorRect.left + docScrollLeft;
  const anchorTop = anchorRect.top + docScrollTop;
  const topPosition = anchorRect.top - (dropdownRect.height + marginTop);
  const rightPosition = anchorRect.left + anchorRect.width + dropdownRect.width;
  const bottomPosition = anchorRect.top + anchorRect.height + dropdownRect.height;
  const leftPosition = anchorRect.left - dropdownRect.width;

  switch (align) {
    case 'bottom': {
      return bottomPosition < docHeight || topPosition < 0
        ? [anchorLeft, anchorTop + anchorRect.height]
        : [anchorLeft, anchorTop - dropdownRect.height - marginY];
    }
    case 'top': {
      // const aboveX = anchorRect.top - (dropdownRect.height + marginTop);
      // const top = anchorRect.top - (dropdownRect.height + marginTop);

      return topPosition > 0
        ? [anchorLeft, anchorTop - dropdownRect.height - marginY]
        : [anchorLeft, anchorTop + anchorRect.height];
    }
    case 'left': {
      // const left = anchorLeft - dropdownRect.width;
      // const right = anchorLeft + anchorRect.width + dropdownRect.width;

      console.log(leftPosition, rightPosition);

      return leftPosition > docWidth || leftPosition > 0
        ? [anchorLeft - dropdownRect.width - marginX, anchorTop]
        : [anchorLeft + anchorRect.width, anchorTop];
    }
    case 'right': {
      // const right = anchorLeft + anchorRect.width + dropdownRect.width;
      // const left = anchorLeft - dropdownRect.width;

      return rightPosition < docWidth || leftPosition < 0
        ? [anchorLeft + anchorRect.width, anchorTop]
        : [anchorLeft - dropdownRect.width - marginX, anchorTop];
    }
  }
}

export type DropdownProps = {
  align?: 'top' | 'bottom' | 'left' | 'right'; // Preferred alignment of the dropdown, will mirror if there is not enough space
  children: React.ReactNode;
  open: boolean;
  anchorElement: React.RefObject<HTMLElement>; // HTMLElements or CSS selectors
};

export const Dropdown: React.FC<DropdownProps> = ({
  align = 'bottom',
  children,
  open,
  anchorElement,
}) => {
  const layer = useLayer();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const position = getDropdownPosition(align, anchorElement, dropdownRef);

    setPosition({ x: position[0], y: position[1] });
  }, [align, anchorElement, open]);

  // Events that should reposition the dropdown: scroll, resize

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleResize = () => {
      const position = getDropdownPosition(align, anchorElement, dropdownRef);

      setPosition({ x: position[0], y: position[1] });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  });

  if (!open) {
    return null;
  }

  return (
    <Portal container={layer()}>
      <Box
        ref={dropdownRef}
        position="absolute"
        backgroundColor="white"
        borderRadius="small"
        boxShadow="medium"
        padding="medium"
        style={{
          margin: align === 'bottom' || align === 'top' ? '0.5rem 0' : '0 0.5rem',
          top: position.y,
          left: position.x,
          width: 200,
        }}
      >
        {children}
      </Box>
    </Portal>
  );
};
