export type DropdownPositions = [x: number, y: number];

export function getDropdownPosition(
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
      return topPosition > 0
        ? [anchorLeft, anchorTop - dropdownRect.height - marginY]
        : [anchorLeft, anchorTop + anchorRect.height];
    }
    case 'left': {
      return leftPosition > docWidth || leftPosition > 0
        ? [anchorLeft - dropdownRect.width - marginX, anchorTop]
        : [anchorLeft + anchorRect.width, anchorTop];
    }
    case 'right': {
      return rightPosition < docWidth || leftPosition < 0
        ? [anchorLeft + anchorRect.width, anchorTop]
        : [anchorLeft - dropdownRect.width - marginX, anchorTop];
    }
  }
}
