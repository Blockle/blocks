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

  // Main axis: put the popover's border box against the anchor's side, held
  // inside the viewport when the anchor has scrolled out of view
  if (side === 'top' || side === 'bottom') {
    top = holdInViewport(
      side === 'top'
        ? anchor.top - margin.bottom - popover.height
        : anchor.top + anchor.height + margin.top,
      popover.height,
      viewport.height,
    );
    left = alignOnCrossAxis(
      edge,
      anchor.left,
      anchor.width,
      popover.width,
      viewport.width,
    );
  } else {
    left = holdInViewport(
      side === 'left'
        ? anchor.left - margin.right - popover.width
        : anchor.left + anchor.width + margin.left,
      popover.width,
      viewport.width,
    );
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
 * Returns the most height the popover's border box can take on the side it
 * opens on, keeping it VIEWPORT_PADDING inside the viewport
 */
export function computeAvailableHeight({
  placement,
  anchor,
  popover,
  viewport,
}: ComputePopoverPositionOptions): number {
  const [preferredSide] = placement.split('-') as [PopoverSide];
  const side = flipSide(preferredSide, anchor, popover, viewport);
  let available = viewport.height - VIEWPORT_PADDING * 2;

  if (side === 'top') {
    available = anchor.top - popover.margin.bottom - VIEWPORT_PADDING;
  } else if (side === 'bottom') {
    available =
      viewport.height -
      VIEWPORT_PADDING -
      (anchor.top + anchor.height) -
      popover.margin.top;
  }

  return Math.max(0, available);
}

/**
 * Returns the most width the popover's border box can take, keeping it
 * VIEWPORT_PADDING inside the viewport on both sides
 */
export function computeAvailableWidth(
  viewport: ComputePopoverPositionOptions['viewport'],
): number {
  return Math.max(0, viewport.width - VIEWPORT_PADDING * 2);
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

  return holdInViewport(start, popoverSize, viewportSize);
}

/**
 * Shifts the start of the popover's border box to keep it VIEWPORT_PADDING
 * inside the viewport. A popover that does not fit starts VIEWPORT_PADDING
 * from the start edge.
 */
function holdInViewport(
  start: number,
  popoverSize: number,
  viewportSize: number,
) {
  const max = viewportSize - VIEWPORT_PADDING - popoverSize;

  return Math.max(VIEWPORT_PADDING, Math.min(start, max));
}

export type PopoverLayout = {
  x: number;
  y: number;
  /**
   * The popover's `max-width`: the viewport's width, VIEWPORT_PADDING inside
   * both edges. It follows the popover's `box-sizing`, so padding and border
   * fit too.
   */
  maxWidth?: number;
  /**
   * The popover's `max-height`, when it is limited to the room it has. It
   * follows the popover's `box-sizing`, so padding and border fit too.
   */
  maxHeight?: number;
};

/**
 * Measures the anchor and popover and returns where to put the popover. A
 * popover wider than the viewport is capped to it, and placed by its capped
 * width. With `limitHeight`, a popover taller than the room on its side is
 * capped to that room, and placed by its capped height.
 */
export function getPopoverLayout(
  placement: PopoverPlacement,
  anchorRef: React.RefObject<HTMLElement | null>,
  popoverRef: React.RefObject<HTMLElement | null>,
  limitHeight = false,
): PopoverLayout {
  if (!anchorRef.current || !popoverRef.current) {
    return { x: 0, y: 0 };
  }

  const element = popoverRef.current;

  // Get the measurements of the anchor and popover
  const anchorRect = anchorRef.current.getBoundingClientRect();
  const popoverRect = element.getBoundingClientRect();
  const popoverStyles = getComputedStyle(element);

  // The theme animates the popover's transform, so undo its scale
  const [measuredWidth, measuredHeight] = getOriginalElementSize(
    popoverStyles,
    popoverRect.width,
    popoverRect.height,
  );

  const style = (property: string) =>
    cssValueToNumber(popoverStyles.getPropertyValue(property));
  const borderY = style('border-top-width') + style('border-bottom-width');
  const isContentBox = popoverStyles.boxSizing === 'content-box';

  // A capped popover measures its content, so the cap from an earlier
  // opening doesn't shrink it
  const height = limitHeight
    ? Math.max(measuredHeight, element.scrollHeight + borderY)
    : measuredHeight;

  const { documentElement } = document;
  const viewport = {
    width: documentElement.clientWidth,
    height: documentElement.clientHeight,
    scrollX: documentElement.scrollLeft,
    scrollY: documentElement.scrollTop,
  };

  // The width cap only depends on the viewport, so an earlier cap that is
  // too narrow is lifted by the new one, and the popover's resize lays it
  // out again at its full width
  const availableWidth = computeAvailableWidth(viewport);
  const options: ComputePopoverPositionOptions = {
    placement,
    anchor: anchorRect,
    popover: {
      width: Math.min(measuredWidth, availableWidth),
      height,
      margin: {
        top: style('margin-top'),
        right: style('margin-right'),
        bottom: style('margin-bottom'),
        left: style('margin-left'),
      },
    },
    viewport,
  };

  // The room is for the border box; a content-box max-width or max-height
  // leaves out the padding and border
  const paddingAndBorderX = isContentBox
    ? style('padding-left') +
      style('padding-right') +
      style('border-left-width') +
      style('border-right-width')
    : 0;
  const maxWidth = Math.max(0, availableWidth - paddingAndBorderX);

  if (!limitHeight) {
    const [x, y] = computePopoverPosition(options);

    return { x, y, maxWidth };
  }

  const availableHeight = computeAvailableHeight(options);
  const [x, y] = computePopoverPosition({
    ...options,
    popover: { ...options.popover, height: Math.min(height, availableHeight) },
  });
  const paddingAndBorderY = isContentBox
    ? style('padding-top') + style('padding-bottom') + borderY
    : 0;

  return {
    x,
    y,
    maxWidth,
    maxHeight: Math.max(0, availableHeight - paddingAndBorderY),
  };
}
