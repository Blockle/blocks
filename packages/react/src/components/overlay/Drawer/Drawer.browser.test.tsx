import { vars } from '@blockle/blocks-core';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Drawer } from './Drawer.js';

const expectedColors = async (mode: 'light' | 'dark') => ({
  surface: await resolve(vars.colorRole.surface.raised, mode),
  text: await resolve(vars.colorRole.text.default, mode),
});

const renderDrawer = (colorMode: 'light' | 'dark' | 'system') =>
  render(
    <Drawer open onRequestClose={vi.fn()} aria-label="Menu">
      Drawer content
    </Drawer>,
    { colorMode },
  );

describe('Drawer colors (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  for (const mode of ['light', 'dark'] as const) {
    it(`uses the raised surface and default text while open in ${mode} mode`, async () => {
      const expected = await expectedColors(mode);
      const screen = await renderDrawer(mode);
      const drawer = screen.getByLabelText('Menu').element();

      expect(drawer.matches(':modal')).toBe(true);
      expect(getComputedStyle(drawer).backgroundColor).toBe(expected.surface);
      expect(getComputedStyle(drawer).color).toBe(expected.text);
    });
  }

  it('follows the OS preference under system, including a switch while open', async () => {
    const light = await expectedColors('light');
    const dark = await expectedColors('dark');

    await emulateColorScheme('dark');

    const screen = await renderDrawer('system');
    const drawer = screen.getByLabelText('Menu').element();

    expect(getComputedStyle(drawer).backgroundColor).toBe(dark.surface);
    expect(getComputedStyle(drawer).color).toBe(dark.text);

    await emulateColorScheme('light');

    expect(getComputedStyle(drawer).backgroundColor).toBe(light.surface);
    expect(getComputedStyle(drawer).color).toBe(light.text);
  });
});
