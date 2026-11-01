import { Activity, Suspense, use, useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { centerOf, outside, press } from '../../testUtils/browser/pointer.js';
import { render } from '../../testUtils/browser/render.js';
import { Button } from '../form/Button/Button.js';
import { Dialog } from './Dialog/Dialog.js';
import { Drawer } from './Drawer/Drawer.js';
import { Menu } from './Menu/Menu.js';
import { Popover } from './Popover/Popover.js';
import type { RequestCloseReason } from './requestCloseReason.js';
import { Tooltip } from './Tooltip/Tooltip.js';

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
        placement="bottom"
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

  it.each([
    [
      'stopPropagation()',
      (event: React.KeyboardEvent) => event.stopPropagation(),
    ],
    [
      'preventDefault()',
      (event: React.KeyboardEvent) => event.preventDefault(),
    ],
  ])('ignores an Escape content claims with %s', async (_, claim) => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <PopoverOverlay onRequestClose={onRequestClose}>
        <input
          aria-label="Title"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              claim(event);
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

  it('keeps the body scroll locked while the outer one is open', async () => {
    const screen = await render(nested(false));

    expect(document.body.style.overflow).toBe('hidden');

    await screen.rerender(nested(true));
    await screen.rerender(nested(false));

    expect(document.body.style.overflow).toBe('hidden');
  });
});

const siblings = [
  ['Dialog', 'Drawer', Dialog, Drawer],
  ['Drawer', 'Dialog', Drawer, Dialog],
  ['Dialog', 'Dialog', Dialog, Dialog],
] as const;

describe.each(
  siblings,
)('%s beside a %s close requests (browser)', (_, __, Top, Lower) => {
  const besides = (
    topOpen: boolean,
    onTopClose = vi.fn(),
    onLowerClose = vi.fn(),
  ) => (
    <>
      <Lower open aria-label="Lower" onRequestClose={onLowerClose}>
        <input aria-label="Name" />
      </Lower>
      <Top open={topOpen} aria-label="Top" onRequestClose={onTopClose}>
        <input aria-label="Title" />
      </Top>
    </>
  );

  const settle = async () => {
    // The click outside listeners are attached on the next frame
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    await Promise.all(document.getAnimations().map(({ finished }) => finished));
  };

  // Opens the top one after the lower one, from outside the lower one
  const renderBesides = async () => {
    const onTopClose = vi.fn();
    const onLowerClose = vi.fn();
    const screen = await render(besides(false, onTopClose, onLowerClose));

    await screen.rerender(besides(true, onTopClose, onLowerClose));
    await settle();

    return { onTopClose, onLowerClose, screen };
  };

  it('does not request to close the lower one on a click in the top one', async () => {
    const { onTopClose, onLowerClose, screen } = await renderBesides();

    await press(
      centerOf(screen.getByRole('textbox', { name: 'Title' }).element()),
    );

    expect(onTopClose).not.toHaveBeenCalled();
    expect(onLowerClose).not.toHaveBeenCalled();
  });

  it('requests to close only the top one on a click outside', async () => {
    const { onTopClose, onLowerClose } = await renderBesides();

    await press(outside());

    expect(onTopClose).toHaveBeenCalledTimes(1);
    expect(onTopClose).toHaveBeenCalledWith('outside-click');
    expect(onLowerClose).not.toHaveBeenCalled();
  });

  it('requests to close the lower one on a click outside once the top one closes', async () => {
    const { onTopClose, onLowerClose, screen } = await renderBesides();

    await screen.rerender(besides(false, onTopClose, onLowerClose));
    await settle();
    await press(outside());

    expect(onLowerClose).toHaveBeenCalledTimes(1);
    expect(onLowerClose).toHaveBeenCalledWith('outside-click');
  });

  it('requests to close only the top one on an Escape', async () => {
    const { onTopClose, onLowerClose, screen } = await renderBesides();

    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');

    expect(onTopClose).toHaveBeenCalledTimes(1);
    expect(onTopClose).toHaveBeenCalledWith('escape');
    expect(onLowerClose).not.toHaveBeenCalled();
  });
});

const settleOverlays = async () => {
  // The click outside listeners are attached on the next frame
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  await Promise.all(document.getAnimations().map(({ finished }) => finished));
};

const modalComponents = [
  ['Dialog', Dialog],
  ['Drawer', Drawer],
] as const;

describe.each(
  modalComponents,
)('Menu in a %s close requests (browser)', (_, Modal) => {
  const renderMenuInModal = async () => {
    const onModalClose = vi.fn();
    const screen = await render(
      <Modal open aria-label="Modal" onRequestClose={onModalClose}>
        <Menu items={[{ label: 'Rename', onSelect() {} }]}>
          <Button>Actions</Button>
        </Menu>
      </Modal>,
    );

    await settleOverlays();
    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await expect.element(screen.getByRole('menu')).toBeVisible();
    await settleOverlays();

    return { onModalClose, screen };
  };

  it('closes only the Menu on an Escape, and focuses its trigger', async () => {
    const { onModalClose, screen } = await renderMenuInModal();

    await userEvent.keyboard('{Escape}');

    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
    expect(onModalClose).not.toHaveBeenCalled();
    await expect
      .element(screen.getByRole('button', { name: 'Actions' }))
      .toHaveFocus();
  });

  it('requests to close the modal with "escape" on a second Escape', async () => {
    const { onModalClose, screen } = await renderMenuInModal();

    await userEvent.keyboard('{Escape}');
    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
    await userEvent.keyboard('{Escape}');

    expect(onModalClose).toHaveBeenCalledTimes(1);
    expect(onModalClose).toHaveBeenCalledWith('escape');
  });

  it('closes only the Menu on a click outside the modal', async () => {
    const { onModalClose, screen } = await renderMenuInModal();

    await press(outside());

    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
    expect(onModalClose).not.toHaveBeenCalled();
  });
});

describe.each(
  modalComponents,
)('Tooltip in a %s close requests (browser)', (_, Modal) => {
  it('closes only the Tooltip on an Escape, then requests to close the modal', async () => {
    const onModalClose = vi.fn();
    const screen = await render(
      <Modal open aria-label="Modal" onRequestClose={onModalClose}>
        <input aria-label="Title" />
        <Tooltip content="Tip">
          <button type="button">Help</button>
        </Tooltip>
      </Modal>,
    );

    await settleOverlays();
    screen.getByRole('button', { name: 'Help' }).element().focus();
    await expect.element(screen.getByRole('tooltip')).toBeVisible();
    await settleOverlays();

    await userEvent.keyboard('{Escape}');

    await expect.element(screen.getByRole('tooltip')).not.toBeInTheDocument();
    expect(onModalClose).not.toHaveBeenCalled();

    await userEvent.keyboard('{Escape}');

    expect(onModalClose).toHaveBeenCalledTimes(1);
    expect(onModalClose).toHaveBeenCalledWith('escape');
  });
});

describe.each(
  modalComponents,
)('Popover under a %s opened after it (browser)', (_, Modal) => {
  const under = (
    modalOpen: boolean,
    onPopoverClose = vi.fn(),
    onModalClose = vi.fn(),
  ) => (
    <>
      <PopoverOverlay onRequestClose={onPopoverClose}>Content</PopoverOverlay>
      <Modal open={modalOpen} aria-label="Modal" onRequestClose={onModalClose}>
        <input aria-label="Title" />
      </Modal>
    </>
  );

  const renderUnder = async () => {
    const onPopoverClose = vi.fn();
    const onModalClose = vi.fn();
    const screen = await render(under(false, onPopoverClose, onModalClose));

    await settleOverlays();
    await screen.rerender(under(true, onPopoverClose, onModalClose));
    await settleOverlays();

    return { onPopoverClose, onModalClose, screen };
  };

  it('leaves an Escape to the modal', async () => {
    const { onPopoverClose, onModalClose, screen } = await renderUnder();

    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');

    expect(onModalClose).toHaveBeenCalledTimes(1);
    expect(onModalClose).toHaveBeenCalledWith('escape');
    expect(onPopoverClose).not.toHaveBeenCalled();
  });

  it('leaves a click outside to the modal', async () => {
    const { onPopoverClose, onModalClose } = await renderUnder();

    await press(outside());

    expect(onModalClose).toHaveBeenCalledTimes(1);
    expect(onModalClose).toHaveBeenCalledWith('outside-click');
    expect(onPopoverClose).not.toHaveBeenCalled();
  });
});

const Suspended: React.FC<{ promise: Promise<never> }> = ({ promise }) => {
  use(promise);

  return null;
};

describe.each(
  modalComponents,
)('%s with a suspended child close requests (browser)', (_, Modal) => {
  it('requests to close with "escape" on an Escape', async () => {
    const onRequestClose = vi.fn();
    const screen = await render(
      <Modal open aria-label="Modal" onRequestClose={onRequestClose}>
        <input aria-label="Title" />
        <Suspense fallback="Loading">
          <Suspended promise={new Promise<never>(() => {})} />
        </Suspense>
      </Modal>,
    );

    await expect.element(screen.getByText('Loading')).toBeVisible();
    await userEvent.click(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.keyboard('{Escape}');

    expect(onRequestClose).toHaveBeenCalledTimes(1);
    expect(onRequestClose).toHaveBeenCalledWith('escape');
  });
});
