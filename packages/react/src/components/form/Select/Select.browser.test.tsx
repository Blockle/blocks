import { vars } from '@blockle/blocks-core';
import { afterEach, describe, expect, it } from 'vitest';

import { resolve } from '../../../testUtils/browser/contrast.js';
import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Select } from './Select.js';

const renderSelect = (
  colorMode: 'light' | 'dark' | 'system',
  variant?: 'outline' | 'solid',
) =>
  render(
    <Select aria-label="Fruit" variant={variant}>
      <option value="apple">Apple</option>
      <option value="pear">Pear</option>
    </Select>,
    { colorMode },
  );

const expectedColors = async (mode: 'light' | 'dark') => ({
  surface: await resolve(vars.colorRole.surface.raised, mode),
  text: await resolve(vars.colorRole.text.default, mode),
  border: await resolve(vars.colorRole.intentPrimary.solid, mode),
});

describe('Select colors (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  for (const mode of ['light', 'dark'] as const) {
    it(`uses surface, text and border roles in ${mode} mode`, async () => {
      const expected = await expectedColors(mode);
      const screen = await renderSelect(mode, 'outline');
      const style = getComputedStyle(screen.getByLabelText('Fruit').element());

      expect(style.backgroundColor).toBe(expected.surface);
      expect(style.color).toBe(expected.text);
      expect(style.borderTopColor).toBe(expected.border);
    });

    it(`colors the options with the text role in ${mode} mode`, async () => {
      const expected = await expectedColors(mode);
      const screen = await renderSelect(mode);
      const option = screen.getByRole('option', { name: 'Apple' }).element();

      expect(getComputedStyle(option).color).toBe(expected.text);
    });
  }

  it('follows the OS preference under system', async () => {
    const light = await expectedColors('light');
    const dark = await expectedColors('dark');

    await emulateColorScheme('dark');

    const screen = await renderSelect('system');
    const select = screen.getByLabelText('Fruit').element();

    expect(getComputedStyle(select).backgroundColor).toBe(dark.surface);
    expect(getComputedStyle(select).color).toBe(dark.text);

    await emulateColorScheme('light');

    expect(getComputedStyle(select).backgroundColor).toBe(light.surface);
    expect(getComputedStyle(select).color).toBe(light.text);
  });
});
