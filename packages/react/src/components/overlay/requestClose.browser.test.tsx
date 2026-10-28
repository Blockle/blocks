import { Activity, useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { outside, press } from '../../testUtils/browser/pointer.js';
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

const modals = [
  ['Dialog', DialogOverlay],
  ['Drawer', DrawerOverlay],
] as const;

// Records whether each Escape keydown was prevented once it is dispatched
const recordEscapes = () => {
  const prevented: boolean[] = [];

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      prevented.push(event.defaultPrevented);
    }
  };

  window.addEventListener('keydown', onKeyDown);

  return {
    prevented,
    stop: () => window.removeEventListener('keydown', onKeyDown),
  };
};

describe.each(modals)('%s close requests (browser)', (_, Overlay) => {
  it('requests to close with "escape" on an unclaimed Escape, and prevents it', async () => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <Overlay onRequestClose={onRequestClose}>
        <input aria-label="Title" />
      </Overlay>,
    );
    const escapes = recordEscapes();

    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');
    escapes.stop();

    expect(onRequestClose).toHaveBeenCalledTimes(1);
    expect(onRequestClose).toHaveBeenCalledWith('escape');
    expect(escapes.prevented).toEqual([true]);

    const dialog = screen.getByTestId('overlay').element() as HTMLDialogElement;

    expect(dialog.open).toBe(true);
  });

  it.each([
    [
      'stopPropagation()',
      (event: React.KeyboardEvent) => event.stopPropagation(),
    ],
    [
      'preventDefault()',
      (event: React.KeyboardEvent) => event.preventDefault(),
    ],
  ])('stays open on an Escape content claims with %s', async (_, claim) => {
    const onRequestClose = vi.fn();
    const cancelEdit = vi.fn();
    const screen = await render(
      <Overlay onRequestClose={onRequestClose}>
        <input
          aria-label="Title"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              claim(event);
              cancelEdit();
            }
          }}
        />
      </Overlay>,
    );
    const dialog = screen.getByTestId('overlay').element() as HTMLDialogElement;

    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');
    await userEvent.keyboard('{Escape}');

    expect(cancelEdit).toHaveBeenCalledTimes(2);
    expect(onRequestClose).not.toHaveBeenCalled();
    expect(dialog.open).toBe(true);
  });

  it('requests to close with "escape" on a close request, and stays open', async () => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <Overlay onRequestClose={onRequestClose}>Content</Overlay>,
    );
    const dialog = screen.getByTestId('overlay').element() as HTMLDialogElement;

    // As the Android back gesture does, after a user activation
    await userEvent.click(dialog);
    dialog.requestClose();

    expect(onRequestClose).toHaveBeenCalledTimes(1);
    expect(onRequestClose).toHaveBeenCalledWith('escape');
    expect(dialog.open).toBe(true);
  });

  it('requests to close on a close request after an Escape content stopped and prevented', async () => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <Overlay onRequestClose={onRequestClose}>
        <input
          aria-label="Title"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              event.preventDefault();
            }
          }}
        />
      </Overlay>,
    );
    const dialog = screen.getByTestId('overlay').element() as HTMLDialogElement;

    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');

    expect(onRequestClose).not.toHaveBeenCalled();

    dialog.requestClose();

    expect(onRequestClose).toHaveBeenCalledTimes(1);
    expect(onRequestClose).toHaveBeenCalledWith('escape');
  });

  it('does not request to close when hidden in an Activity or unmounted', async () => {
    const onRequestClose = vi.fn();
    const ui = (mode: 'visible' | 'hidden') => (
      <Activity mode={mode}>
        <Overlay onRequestClose={onRequestClose}>Content</Overlay>
      </Activity>
    );
    const screen = await render(ui('visible'));
    const dialog = screen.getByTestId('overlay').element() as HTMLDialogElement;

    await screen.rerender(ui('hidden'));

    expect(dialog.open).toBe(false);

    await screen.rerender(ui('visible'));
    await screen.unmount();

    expect(onRequestClose).not.toHaveBeenCalled();
  });
});

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
      >
        {children}
      </Popover>
    </>
  );
};

describe('Popover close requests (browser)', () => {
  it('requests to close with "escape" on an unclaimed Escape, and prevents it', async () => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <PopoverOverlay onRequestClose={onRequestClose}>Content</PopoverOverlay>,
    );
    const escapes = recordEscapes();

    // Focus stays on the anchor, a click on it would be a click outside
    screen.getByRole('button', { name: 'Anchor' }).element().focus();
    await userEvent.keyboard('{Escape}');
    escapes.stop();

    expect(onRequestClose).toHaveBeenCalledTimes(1);
    expect(onRequestClose).toHaveBeenCalledWith('escape');
    expect(escapes.prevented).toEqual([true]);
  });

  it('ignores an Escape content claims with preventDefault()', async () => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <PopoverOverlay onRequestClose={onRequestClose}>
        <input
          aria-label="Title"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
            }
          }}
        />
      </PopoverOverlay>,
    );

    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');

    expect(onRequestClose).not.toHaveBeenCalled();
  });
});

const nestings = [
  ['Dialog', 'Drawer', Dialog, Drawer],
  ['Drawer', 'Dialog', Drawer, Dialog],
  ['Drawer', 'Drawer', Drawer, Drawer],
] as const;

describe.each(
  nestings,
)('%s in a %s close requests (browser)', (_, __, Inner, Outer) => {
  const nested = (
    innerOpen: boolean,
    onInnerClose = vi.fn(),
    onOuterClose = vi.fn(),
  ) => (
    <Outer open aria-label="Outer" onRequestClose={onOuterClose}>
      <Inner open={innerOpen} aria-label="Inner" onRequestClose={onInnerClose}>
        <input aria-label="Title" />
      </Inner>
    </Outer>
  );

  // Opens the inner one from the outer one, as an app does
  const renderNested = async () => {
    const onInnerClose = vi.fn();
    const onOuterClose = vi.fn();
    const screen = await render(nested(false, onInnerClose, onOuterClose));

    await screen.rerender(nested(true, onInnerClose, onOuterClose));

    // The click outside listeners are attached on the next frame
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    await Promise.all(document.getAnimations().map(({ finished }) => finished));

    return { onInnerClose, onOuterClose, screen };
  };

  it('requests to close only the inner one on an Escape', async () => {
    const { onInnerClose, onOuterClose, screen } = await renderNested();

    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');

    expect(onInnerClose).toHaveBeenCalledTimes(1);
    expect(onInnerClose).toHaveBeenCalledWith('escape');
    expect(onOuterClose).not.toHaveBeenCalled();
  });

  it('requests to close only the inner one on a click outside', async () => {
    const { onInnerClose, onOuterClose } = await renderNested();

    await press(outside());

    expect(onInnerClose).toHaveBeenCalledTimes(1);
    expect(onInnerClose).toHaveBeenCalledWith('outside-click');
    expect(onOuterClose).not.toHaveBeenCalled();
  });

  it('leaves the body scroll lock to the outer one', async () => {
    const screen = await render(nested(false));

    expect(document.body.style.overflow).toBe('hidden');

    await screen.rerender(nested(true));
    await screen.rerender(nested(false));

    expect(document.body.style.overflow).toBe('hidden');
  });
});
