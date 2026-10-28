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
