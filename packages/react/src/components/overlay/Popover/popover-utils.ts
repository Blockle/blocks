export type PopoverPositions = [x: number, y: number];

const parseMatrix = (matrix: string) => {
  const values = matrix
    .replace(/matrix\(|\)|\s/g, '')
    .split(',')
    .map((value) => Number.parseFloat(value)) as [
    number,
    number,
    number,
    number,
    number,
    number,
  ];

  if (values.length !== 6) {
    throw new Error(
      'Invalid matrix string. Expected 6 values for a 2D transformation matrix.',
    );
  }

  return {
    a: values[0],
    b: values[1],
    c: values[2],
    d: values[3],
    e: values[4],
    f: values[5],
  };
};

function getScale(matrix: string): [number, number] {
  const { a, b, c, d } = parseMatrix(matrix);
  const scaleX = Math.sqrt(a * a + b * b);
  const scaleY = Math.sqrt(c * c + d * d);
  return [scaleX, scaleY];
}

function getOriginalSize(
  matrix: string,
  width: number,
  height: number,
): [number, number] {
  const [scaleX, scaleY] = getScale(matrix);
  return [width / scaleX, height / scaleY];
}

export function getPopoverPosition(
  align: 'top' | 'bottom' | 'left' | 'right',
  anchorRef: React.RefObject<HTMLElement | null>,
  popoverRef: React.RefObject<HTMLElement | null>,
): PopoverPositions {
  if (!anchorRef.current || !popoverRef.current) {
    return [0, 0];
  }

  // Get the measurements of the anchor and popover
  const anchorRect = anchorRef.current.getBoundingClientRect();
  const popoverRect = popoverRef.current.getBoundingClientRect();
  let popoverStyles = getComputedStyle(popoverRef.current);

  const transform = popoverStyles.getPropertyValue('transform');

  const [popoverWidth, popoverHeight] = getOriginalSize(
    transform,
    popoverRect.width,
    popoverRect.height,
  );

  popoverStyles = getComputedStyle(popoverRef.current);

  const marginTop = Number.parseFloat(
    popoverStyles.getPropertyValue('margin-top'),
  );
  const marginRight = Number.parseFloat(
    popoverStyles.getPropertyValue('margin-right'),
  );
  const marginBottom = Number.parseFloat(
    popoverStyles.getPropertyValue('margin-bottom'),
  );
  const marginLeft = Number.parseFloat(
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

  switch (align) {
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
