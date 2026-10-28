/// <reference types="@vitest/browser-playwright" />

import { cdp } from 'vitest/browser';

export type Point = { x: number; y: number };

// The tests run in an iframe, while CDP takes coordinates in the top page
const toPage = ({ x, y }: Point): Point => {
  const frame = window.frameElement;

  if (!frame) {
    return { x, y };
  }

  const rect = frame.getBoundingClientRect();
  const scale = rect.width / (frame as HTMLElement).offsetWidth;

  return { x: rect.left + x * scale, y: rect.top + y * scale };
};

/**
 * Dispatches a trusted mouse event at a point in the test frame. Chromium only.
 */
export const mouse = async (
  type: 'mousePressed' | 'mouseMoved' | 'mouseReleased',
  point: Point,
) => {
  await cdp().send('Input.dispatchMouseEvent', {
    type,
    ...toPage(point),
    button: 'left',
    buttons: type === 'mouseReleased' ? 0 : 1,
    clickCount: type === 'mouseMoved' ? 0 : 1,
  });
};

/**
 * Presses the left button at `from`, moves to `to` and releases it there.
 */
export const press = async (from: Point, to: Point = from) => {
  await mouse('mousePressed', from);

  if (to !== from) {
    await mouse('mouseMoved', to);
  }

  await mouse('mouseReleased', to);
};

export const centerOf = (element: Element): Point => {
  const { left, top, width, height } = element.getBoundingClientRect();

  return { x: left + width / 2, y: top + height / 2 };
};

/**
 * The bottom right corner of the viewport, clear of the overlays under test.
 */
export const outside = (): Point => ({
  x: window.innerWidth - 5,
  y: window.innerHeight - 5,
});
