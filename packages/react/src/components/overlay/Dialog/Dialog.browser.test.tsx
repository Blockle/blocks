import { afterEach, describe, expect, it, vi } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Dialog } from './Dialog.js';

describe('Dialog theme precedence (browser)', () => {
  afterEach(() => {
    document.head.querySelector('[data-app-styles]')?.remove();
  });

  it('lets an app className set the width, whatever the stylesheet order', async () => {
    // First in <head>, so every theme stylesheet comes after it
    const appStyles = document.createElement('style');
    appStyles.dataset.appStyles = '';
    appStyles.textContent =
      '.app-wide { inline-size: 50rem; max-inline-size: none; }';
    document.head.prepend(appStyles);

    const screen = await render(
      <Dialog
        open
        onRequestClose={vi.fn()}
        aria-label="Wide"
        className="app-wide"
      >
        Dialog content
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog').element();

    expect(getComputedStyle(dialog).width).toBe('800px');
  });
});
