import { useRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  centerOf,
  mouse,
  outside,
  press,
} from '../../testUtils/browser/pointer.js';
import { render } from '../../testUtils/browser/render.js';
import { Dialog } from './Dialog/Dialog.js';
import { Drawer } from './Drawer/Drawer.js';
import { Popover } from './Popover/Popover.js';
import type { RequestCloseReason } from './requestCloseReason.js';

type OverlayProps = {
  onRequestClose: (reason: RequestCloseReason) => void;
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
        placement="bottom"
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
    expect(onRequestClose).toHaveBeenCalledWith('outside-click');
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
