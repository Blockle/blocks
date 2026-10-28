import { cssValueToNumber, getOriginalElementSize } from '@blockle/blocks-core';

export type PopoverPositions = [x: number, y: number];

type PopoverSide = 'top' | 'bottom' | 'left' | 'right';

type PopoverEdge = 'start' | 'end';

export type PopoverPlacement = PopoverSide | `${PopoverSide}-${PopoverEdge}`;

type Rect = { top: number; left: number; width: number; height: number };

type Margin = { top: number; right: number; bottom: number; left: number };

export type ComputePopoverPositionOptions = {
  placement: PopoverPlacement;
  /** The anchor's border box, relative to the viewport */
  anchor: Rect;
  /** The popover's untransformed border-box size and its margins */
  popover: { width: number; height: number; margin: Margin };
  viewport: { width: number; height: number; scrollX: number; scrollY: number };
};

/**
 * Returns the popover's `left` and `top`, relative to the document
 */
export function computePopoverPosition({
  placement,
  anchor,
  popover,
  viewport,
}: ComputePopoverPositionOptions): PopoverPositions {
  const [preferredSide, edge] = placement.split('-') as [
    PopoverSide,
    PopoverEdge?,
  ];
  const { margin } = popover;
  const side = flipSide(preferredSide, anchor, popover, viewport);
  let left: number;
  let top: number;

  // Main axis: put the popover's border box against the anchor's side
  if (side === 'top' || side === 'bottom') {
    top =
      side === 'top'
        ? anchor.top - margin.bottom - popover.height
        : anchor.top + anchor.height + margin.top;
    left = alignOnCrossAxis(
      edge,
      anchor.left,
      anchor.width,
      popover.width,
      viewport.width,
    );
  } else {
    left =
      side === 'left'
        ? anchor.left - margin.right - popover.width
        : anchor.left + anchor.width + margin.left;
    top = alignOnCrossAxis(
      edge,
      anchor.top,
      anchor.height,
      popover.height,
      viewport.height,
    );
  }

  return [
    left - margin.left + viewport.scrollX,
    top - margin.top + viewport.scrollY,
  ];
}

// Minimum distance between the popover and the viewport's edges
const VIEWPORT_PADDING = 8;

const oppositeSide = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const satisfies Record<PopoverSide, PopoverSide>;

/**
 * Returns the opposite side when the popover does not fit on the preferred
 * side and the opposite side has more room, otherwise the preferred side
 */
function flipSide(
  side: PopoverSide,
  anchor: Rect,
  popover: ComputePopoverPositionOptions['popover'],
  viewport: ComputePopoverPositionOptions['viewport'],
): PopoverSide {
  const { margin } = popover;
  const room = {
    top: anchor.top,
    bottom: viewport.height - anchor.top - anchor.height,
    left: anchor.left,
    right: viewport.width - anchor.left - anchor.width,
  };
  const needed =
    side === 'top' || side === 'bottom'
      ? popover.height + margin.top + margin.bottom
      : popover.width + margin.left + margin.right;
  const opposite = oppositeSide[side];

  if (room[side] < needed && room[opposite] > room[side]) {
    return opposite;
  }

  return side;
}

/**
 * Returns the start of the popover's border box on the cross axis: lined up
 * with the anchor's start or end edge, or centred on it, then shifted to keep
 * it VIEWPORT_PADDING inside the viewport. A popover that does not fit
 * starts VIEWPORT_PADDING from the start edge.
 */
function alignOnCrossAxis(
  edge: PopoverEdge | undefined,
  anchorStart: number,
  anchorSize: number,
  popoverSize: number,
  viewportSize: number,
) {
  let start = anchorStart + (anchorSize - popoverSize) / 2;

  if (edge === 'start') {
    start = anchorStart;
  } else if (edge === 'end') {
    start = anchorStart + anchorSize - popoverSize;
  }

  const max = viewportSize - VIEWPORT_PADDING - popoverSize;

  return Math.max(VIEWPORT_PADDING, Math.min(start, max));
}

export function getPopoverPosition(
  placement: PopoverPlacement,
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

  // The theme animates the popover's transform, so undo its scale
  const [width, height] = getOriginalElementSize(
    popoverStyles,
    popoverRect.width,
    popoverRect.height,
  );

  const { documentElement } = document;

  return computePopoverPosition({
    placement,
    anchor: anchorRect,
    popover: {
      width,
      height,
      margin: {
        top: cssValueToNumber(popoverStyles.getPropertyValue('margin-top')),
        right: cssValueToNumber(popoverStyles.getPropertyValue('margin-right')),
        bottom: cssValueToNumber(
          popoverStyles.getPropertyValue('margin-bottom'),
        ),
        left: cssValueToNumber(popoverStyles.getPropertyValue('margin-left')),
      },
    },
    viewport: {
      width: documentElement.clientWidth,
      height: documentElement.clientHeight,
      scrollX: documentElement.scrollLeft,
      scrollY: documentElement.scrollTop,
    },
  });
}
