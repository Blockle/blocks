import { cssValueToNumber, getOriginalElementSize } from '@blockle/blocks-core';

export type PopoverPositions = [x: number, y: number];

export function getPopoverPosition(
  position: 'top' | 'bottom' | 'left' | 'right',
  anchorRef: React.RefObject<HTMLElement | null>,
  popoverRef: React.RefObject<HTMLElement | null>,
): PopoverPositions {
  if (!anchorRef.current || !popoverRef.current) {
    return [0, 0];
  }
  // Get the measurements of the anchor and popover
  const anchorRect = anchorRef.current.getBoundingClientRect();
  const popoverRect = popoverRef.current.getBoundingClientRect();
  const popoverStyles = getComputedStyle(popoverRef.current);

  const [popoverWidth, popoverHeight] = getOriginalElementSize(
    popoverStyles,
    popoverRect.width,
    popoverRect.height,
  );

  const marginTop = cssValueToNumber(
    popoverStyles.getPropertyValue('margin-top'),
  );
  const marginRight = cssValueToNumber(
    popoverStyles.getPropertyValue('margin-right'),
  );
  const marginBottom = cssValueToNumber(
    popoverStyles.getPropertyValue('margin-bottom'),
  );
  const marginLeft = cssValueToNumber(
    popoverStyles.getPropertyValue('margin-left'),
  );
  const marginY = marginTop + marginBottom;
  const marginX = marginRight + marginLeft;

  const docHeight = document.documentElement.clientHeight;
  const docWidth = document.documentElement.clientWidth;
  const docScrollTop = document.documentElement.scrollTop;
  const docScrollLeft = document.documentElement.scrollLeft;

  const anchorLeft = anchorRect.left + docScrollLeft;
  const anchorTop = anchorRect.top + docScrollTop;
  const topPosition = anchorRect.top - (popoverHeight + marginTop);
  const rightPosition = anchorRect.left + anchorRect.width + popoverWidth;
  const bottomPosition = anchorRect.top + anchorRect.height + popoverHeight;
  const leftPosition = anchorRect.left - popoverWidth;

  const offsetX =
    anchorLeft - marginLeft - (popoverWidth - anchorRect.width) / 2;
  const offsetY =
    anchorTop - marginTop - (popoverHeight - anchorRect.height) / 2;

  switch (position) {
    case 'top': {
      return topPosition > 0
        ? [offsetX, anchorTop - popoverHeight - marginY]
        : [offsetX, anchorTop + anchorRect.height];
    }
    case 'bottom': {
      return bottomPosition < docHeight || topPosition < 0
        ? [offsetX, anchorTop + anchorRect.height]
        : [offsetX, anchorTop - popoverHeight - marginY];
    }
    case 'left': {
      return leftPosition > docWidth || leftPosition > 0
        ? [anchorLeft - popoverWidth - marginX, offsetY]
        : [anchorLeft + anchorRect.width, offsetY];
    }
    case 'right': {
      return rightPosition < docWidth || leftPosition < 0
        ? [anchorLeft + anchorRect.width, offsetY]
        : [anchorLeft - popoverWidth - marginX, offsetY];
    }
  }
}
