/// <reference types="@vitest/browser-playwright" />

import { useRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { cdp } from 'vitest/browser';

import { render } from '../../testUtils/browser/render.js';
import { Dialog } from './Dialog/Dialog.js';
import { Drawer } from './Drawer/Drawer.js';
import { Popover } from './Popover/Popover.js';

type Point = { x: number; y: number };

type OverlayProps = {
  onRequestClose: () => void;
  children: React.ReactNode;
};

const DialogOverlay: React.FC<OverlayProps> = ({
  onRequestClose,
  children,
}) => (
  <Dialog open onRequestClose={onRequestClose} data-testid="overlay">
    {children}
  </Dialog>
);

const DrawerOverlay: React.FC<OverlayProps> = ({
  onRequestClose,
  children,
}) => (
  <Drawer open onRequestClose={onRequestClose} data-testid="overlay">
    {children}
  </Drawer>
);

const PopoverOverlay: React.FC<OverlayProps> = ({
  onRequestClose,
  children,
}) => {
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={anchorRef} type="button">
        Anchor
      </button>
      <Popover
        open
        anchorElement={anchorRef}
        position="bottom"
        onRequestClose={onRequestClose}
        data-testid="overlay"
      >
        {children}
      </Popover>
    </>
  );
};

const overlays = [
  ['Dialog', DialogOverlay],
  ['Drawer', DrawerOverlay],
  ['Popover', PopoverOverlay],
] as const;

// A button that swaps itself for an input in its own click handler
const EditToggle: React.FC = () => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <input aria-label="Description" />;
  }

  return (
    <button type="button" onClick={() => setEditing(true)}>
      Edit
    </button>
  );
};

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));

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

const mouse = async (
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

// Presses the left button at `from`, moves to `to` and releases it there
const press = async (from: Point, to: Point = from) => {
  await mouse('mousePressed', from);

  if (to !== from) {
    await mouse('mouseMoved', to);
  }

  await mouse('mouseReleased', to);
};

const centerOf = (element: Element): Point => {
  const { left, top, width, height } = element.getBoundingClientRect();

  return { x: left + width / 2, y: top + height / 2 };
};

// The bottom right corner of the viewport, clear of every overlay under test
const outside = (): Point => ({
  x: window.innerWidth - 5,
  y: window.innerHeight - 5,
});

describe.each(overlays)('%s click outside (browser)', (_, Overlay) => {
  const renderOverlay = async (children: React.ReactNode = 'Content') => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <Overlay onRequestClose={onRequestClose}>{children}</Overlay>,
    );

    // The click outside listener is attached on the next frame
    await nextFrame();
    await nextFrame();

    // Let the opening animation settle, so nothing moves under the pointer
    await Promise.all(document.getAnimations().map(({ finished }) => finished));

    return { onRequestClose, screen };
  };

  it('stays open when a click inside removes its own target', async () => {
    const { onRequestClose, screen } = await renderOverlay(<EditToggle />);

    await press(
      centerOf(screen.getByRole('button', { name: 'Edit' }).element()),
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'Description' }))
      .toBeInTheDocument();
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('stays open when a press inside is released outside', async () => {
    const { onRequestClose, screen } = await renderOverlay();

    await press(centerOf(screen.getByTestId('overlay').element()), outside());

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('stays open when the parent re-renders during a press inside', async () => {
    const { onRequestClose, screen } = await renderOverlay();

    await mouse(
      'mousePressed',
      centerOf(screen.getByTestId('overlay').element()),
    );

    // A new inline callback, as a parent re-render passes
    await screen.rerender(
      <Overlay onRequestClose={() => onRequestClose()}>Content</Overlay>,
    );
    await nextFrame();
    await nextFrame();

    await mouse('mouseMoved', outside());
    await mouse('mouseReleased', outside());

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('stays open when a press outside is released inside', async () => {
    const { onRequestClose, screen } = await renderOverlay();

    await press(outside(), centerOf(screen.getByTestId('overlay').element()));

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('requests to close once on a click outside', async () => {
    const { onRequestClose } = await renderOverlay();

    await press(outside());

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('requests to close on a keyboard click outside after a stopped click inside', async () => {
    const { onRequestClose, screen } = await renderOverlay(
      <button
        type="button"
        onClick={(event) => event.nativeEvent.stopImmediatePropagation()}
      >
        Stop
      </button>,
    );

    await press(
      centerOf(screen.getByRole('button', { name: 'Stop' }).element()),
    );

    expect(onRequestClose).not.toHaveBeenCalled();

    // A keyboard activation fires a click without any pointer events
    document.body.click();

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});
