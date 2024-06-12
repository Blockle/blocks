export type PopoverPositions = [x: number, y: number];

export function getPopoverPosition(
  align: 'top' | 'bottom' | 'left' | 'right',
  anchorRef: React.RefObject<HTMLElement>,
  popoverRef: React.RefObject<HTMLElement>,
): PopoverPositions {
  if (!anchorRef.current || !popoverRef.current) {
    return [0, 0];
  }

  // Remove the transform to get the correct measurements
  popoverRef.current.style.transform = 'none';
  popoverRef.current.style.transitionDuration = '0s';

  // Get the measurements of the anchor and popover
  const anchorRect = anchorRef.current.getBoundingClientRect();
  const popoverRect = popoverRef.current.getBoundingClientRect();
  let popoverStyles = getComputedStyle(popoverRef.current);

  const top = popoverStyles.getPropertyValue('top');
  const left = popoverStyles.getPropertyValue('left');
  popoverRef.current.style.left = '0';
  popoverRef.current.style.top = '0';

  popoverStyles = getComputedStyle(popoverRef.current);

  const marginTop = Number.parseFloat(popoverStyles.getPropertyValue('margin-top'));
  const marginRight = Number.parseFloat(popoverStyles.getPropertyValue('margin-right'));
  const marginBottom = Number.parseFloat(popoverStyles.getPropertyValue('margin-bottom'));
  const marginLeft = Number.parseFloat(popoverStyles.getPropertyValue('margin-left'));
  const marginY = marginTop + marginBottom;
  const marginX = marginRight + marginLeft;

  const docHeight = document.documentElement.clientHeight;
  const docWidth = document.documentElement.clientWidth;
  const docScrollTop = document.documentElement.scrollTop;
  const docScrollLeft = document.documentElement.scrollLeft;

  const anchorLeft = anchorRect.left + docScrollLeft;
  const anchorTop = anchorRect.top + docScrollTop;
  const topPosition = anchorRect.top - (popoverRect.height + marginTop);
  const rightPosition = anchorRect.left + anchorRect.width + popoverRect.width;
  const bottomPosition = anchorRect.top + anchorRect.height + popoverRect.height;
  const leftPosition = anchorRect.left - popoverRect.width;

  const offsetX = anchorLeft - marginLeft - (popoverRect.width - anchorRect.width) / 2;
  const offsetY = anchorTop - marginTop - (popoverRect.height - anchorRect.height) / 2;

  // Reset the transform
  popoverRef.current.style.transform = '';
  popoverRef.current.style.transitionDuration = '';
  popoverRef.current.style.top = top;
  popoverRef.current.style.left = left;

  switch (align) {
    case 'top': {
      return topPosition > 0
        ? [offsetX, anchorTop - popoverRect.height - marginY]
        : [offsetX, anchorTop + anchorRect.height];
    }
    case 'bottom': {
      return bottomPosition < docHeight || topPosition < 0
        ? [offsetX, anchorTop + anchorRect.height]
        : [offsetX, anchorTop - popoverRect.height - marginY];
    }
    case 'left': {
      return leftPosition > docWidth || leftPosition > 0
        ? [anchorLeft - popoverRect.width - marginX, offsetY]
        : [anchorLeft + anchorRect.width, offsetY];
    }
    case 'right': {
      return rightPosition < docWidth || leftPosition < 0
        ? [anchorLeft + anchorRect.width, offsetY]
        : [anchorLeft - popoverRect.width - marginX, offsetY];
    }
  }
}
