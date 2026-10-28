import { afterEach, describe, expect, it, vi } from 'vitest';

import { emulateColorScheme } from '../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../testUtils/browser/render.js';
import { Dialog } from './Dialog/Dialog.js';
import { Popover } from './Popover/Popover.js';
import { Portal } from './Portal/Portal.js';

// momotaro: surface.raised, overlay.default and shadow roles as [light, dark]
const raised = ['rgb(255, 255, 255)', 'rgb(60, 60, 60)'] as const;
const backdrop = ['rgba(13, 13, 13, 0.4)', 'rgba(0, 0, 0, 0.6)'] as const;
const shadow3 = [
  'rgba(0, 0, 0, 0.08) 0px 16px 24px 0px',
  'rgba(0, 0, 0, 0.5) 0px 16px 24px 0px',
] as const;
const shadow2 = [
  'rgba(0, 0, 0, 0.08) 0px 8px 16px 0px',
  'rgba(0, 0, 0, 0.45) 0px 8px 16px 0px',
] as const;

const modes = [
  ['light', 0],
  ['dark', 1],
] as const;

describe('Overlay color roles (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  describe.each(modes)('Dialog in %s mode', (colorMode, index) => {
    it('uses the raised surface, overlay backdrop and shadow when portaled', async () => {
      const screen = await render(
        <Portal>
          <Dialog open onRequestClose={vi.fn()} aria-label="Sample">
            Content
          </Dialog>
        </Portal>,
        { colorMode },
      );

      const dialog = screen.getByLabelText('Sample').element();

      expect(getComputedStyle(dialog).backgroundColor).toBe(raised[index]);
      expect(getComputedStyle(dialog).boxShadow).toBe(shadow3[index]);
      expect(getComputedStyle(dialog, '::backdrop').backgroundColor).toBe(
        backdrop[index],
      );
    });
  });

  describe.each(modes)('Popover in %s mode', (colorMode, index) => {
    it('uses the raised surface and shadow when portaled', async () => {
      const anchor = { current: document.body };
      const screen = await render(
        <Portal>
          <Popover
            open
            anchorElement={anchor}
            onRequestClose={vi.fn()}
            data-testid="popover"
          >
            Content
          </Popover>
        </Portal>,
        { colorMode },
      );

      const popover = screen.getByTestId('popover').element();

      expect(getComputedStyle(popover).backgroundColor).toBe(raised[index]);
      expect(getComputedStyle(popover).boxShadow).toBe(shadow2[index]);
    });
  });

  describe('portaled content under system', () => {
    const portaled = (
      <Portal>
        <Dialog open onRequestClose={vi.fn()} aria-label="Sample">
          Content
        </Dialog>
        <Popover
          open
          anchorElement={{ current: document.body }}
          onRequestClose={vi.fn()}
          data-testid="popover"
        >
          Content
        </Popover>
      </Portal>
    );

    it('follows an emulated dark OS', async () => {
      await emulateColorScheme('dark');

      const screen = await render(portaled, { colorMode: 'system' });
      const dialog = screen.getByLabelText('Sample').element();
      const popover = screen.getByTestId('popover').element();

      expect(getComputedStyle(dialog).backgroundColor).toBe(raised[1]);
      expect(getComputedStyle(dialog, '::backdrop').backgroundColor).toBe(
        backdrop[1],
      );
      expect(getComputedStyle(popover).backgroundColor).toBe(raised[1]);
    });

    it('follows an OS switch while open', async () => {
      const screen = await render(portaled, { colorMode: 'system' });
      const dialog = screen.getByLabelText('Sample').element();
      const popover = screen.getByTestId('popover').element();

      expect(getComputedStyle(dialog).backgroundColor).toBe(raised[0]);

      await emulateColorScheme('dark');

      expect(getComputedStyle(dialog).backgroundColor).toBe(raised[1]);
      expect(getComputedStyle(popover).backgroundColor).toBe(raised[1]);

      await emulateColorScheme('light');

      expect(getComputedStyle(dialog).backgroundColor).toBe(raised[0]);
      expect(getComputedStyle(popover).backgroundColor).toBe(raised[0]);
    });

    it('uses color-scheme "light dark" on the page', async () => {
      await render(portaled, { colorMode: 'system' });

      expect(getComputedStyle(document.documentElement).colorScheme).toBe(
        'light dark',
      );
    });
  });
});
