export type DropdownPositions = [x: number, y: number];

export function getDropdownPosition(
  align: 'top' | 'bottom' | 'left' | 'right',
  anchorRef: React.RefObject<HTMLElement>,
  dropdownRef: React.RefObject<HTMLElement>,
): DropdownPositions {
  if (!anchorRef.current || !dropdownRef.current) {
    return [0, 0];
  }

  // Remove the transform to get the correct measurements
  dropdownRef.current.style.transform = 'none';
  dropdownRef.current.style.transitionDuration = '0s';

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

  const offsetX = anchorLeft - (dropdownRect.width - anchorRect.width) / 2;
  const offsetY = anchorTop - (dropdownRect.height - anchorRect.height) / 2;

  // Reset the transform
  dropdownRef.current.style.transform = '';
  dropdownRef.current.style.transitionDuration = '';

  switch (align) {
    case 'top': {
      return topPosition > 0
        ? [offsetX, anchorTop - dropdownRect.height - marginY]
        : [offsetX, anchorTop + anchorRect.height];
    }
    case 'bottom': {
      return bottomPosition < docHeight || topPosition < 0
        ? [offsetX, anchorTop + anchorRect.height]
        : [offsetX, anchorTop - dropdownRect.height - marginY];
    }
    case 'left': {
      return leftPosition > docWidth || leftPosition > 0
        ? [anchorLeft - dropdownRect.width - marginX, offsetY]
        : [anchorLeft + anchorRect.width, offsetY];
    }
    case 'right': {
      return rightPosition < docWidth || leftPosition < 0
        ? [anchorLeft + anchorRect.width, offsetY]
        : [anchorLeft - dropdownRect.width - marginX, offsetY];
    }
  }
}
