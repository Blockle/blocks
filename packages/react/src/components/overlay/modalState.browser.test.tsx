import { momotaro } from '@blockle/blocks-theme-momotaro';
import { Activity, act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { render } from '../../testUtils/browser/render.js';
import { BlocksProvider } from '../providers/BlocksProvider/BlocksProvider.js';
import { Dialog } from './Dialog/Dialog.js';
import { Drawer } from './Drawer/Drawer.js';

type OverlayProps = {
  children: React.ReactNode;
};

const DialogOverlay: React.FC<OverlayProps> = ({ children }) => (
  <Dialog open onRequestClose={vi.fn()} data-testid="overlay">
    {children}
  </Dialog>
);

const DrawerOverlay: React.FC<OverlayProps> = ({ children }) => (
  <Drawer open onRequestClose={vi.fn()} data-testid="overlay">
    {children}
  </Drawer>
);

const overlays = [
  ['Dialog', DialogOverlay],
  ['Drawer', DrawerOverlay],
] as const;

describe.each(overlays)('%s modal state (browser)', (_name, Overlay) => {
  const renderInActivity = (mode: 'visible' | 'hidden') => (
    <Activity mode={mode}>
      <Overlay>Content</Overlay>
    </Activity>
  );

  it('closes while hidden in an Activity and opens as modal when revealed', async () => {
    const screen = await render(renderInActivity('visible'));
    const dialog = screen.getByTestId('overlay').element() as HTMLDialogElement;

    expect(dialog.matches(':modal')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    await screen.rerender(renderInActivity('hidden'));

    expect(dialog.isConnected).toBe(true);
    expect(dialog.open).toBe(false);
    expect(dialog.matches(':modal')).toBe(false);
    expect(document.body.style.overflow).toBe('');

    await screen.rerender(renderInActivity('visible'));

    expect(dialog.open).toBe(true);
    expect(dialog.matches(':modal')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('hydrates a server-rendered open dialog as modal', async () => {
    const ui = (
      <BlocksProvider theme={momotaro}>
        <Overlay>Content</Overlay>
      </BlocksProvider>
    );
    const container = document.createElement('div');

    container.innerHTML = renderToString(ui);
    document.body.append(container);

    const dialog = container.querySelector('dialog') as HTMLDialogElement;

    // The server renders the open attribute, a browser's renderToString does not
    dialog.setAttribute('open', '');

    const onUncaughtError = vi.fn();
    const onRecoverableError = vi.fn();
    const root = await act(async () =>
      hydrateRoot(container, ui, { onUncaughtError, onRecoverableError }),
    );

    expect(onUncaughtError).not.toHaveBeenCalled();
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.querySelector('dialog')).toBe(dialog);
    expect(dialog.matches(':modal')).toBe(true);

    act(() => root.unmount());
    container.remove();
  });
});

const pairs = [
  ['Drawer', 'Dialog', Drawer, Dialog],
  ['Dialog', 'Drawer', Dialog, Drawer],
] as const;

describe.each(
  pairs,
)('%s beside a %s body scroll lock (browser)', (_, __, Top, Lower) => {
  const besides = (lowerOpen: boolean, topOpen: boolean) => (
    <>
      <div style={{ height: '300vh' }}>Page</div>
      <Lower open={lowerOpen} onRequestClose={vi.fn()}>
        Lower
      </Lower>
      <Top open={topOpen} onRequestClose={vi.fn()}>
        Top
      </Top>
    </>
  );

  const expectLocked = () => {
    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.top).toBe('-200px');
  };

  const expectRestored = () => {
    expect(document.body.style.position).toBe('');
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.documentElement.scrollTop).toBe(200);
  };

  const renderBoth = async () => {
    const screen = await render(besides(false, false));

    document.documentElement.scrollTop = 200;

    await screen.rerender(besides(true, false));
    await screen.rerender(besides(true, true));

    expectLocked();

    return screen;
  };

  it('stays locked when the top one closes, until the lower one closes', async () => {
    const screen = await renderBoth();

    await screen.rerender(besides(true, false));

    expectLocked();

    await screen.rerender(besides(false, false));

    expectRestored();
  });

  it('stays locked when the lower one closes, until the top one closes', async () => {
    const screen = await renderBoth();

    await screen.rerender(besides(false, true));

    expectLocked();

    await screen.rerender(besides(false, false));

    expectRestored();
  });
});
