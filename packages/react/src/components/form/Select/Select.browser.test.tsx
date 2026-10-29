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
  border: await resolve(vars.colorRole.primary.solid, mode),
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

describe('Select size (browser)', () => {
  // momotaro matches Button: minHeight 40/48/56, paddingInline space 3/4/5
  const sizes = [
    ['small', 40, '16px'],
    ['medium', 48, '24px'],
    ['large', 56, '32px'],
  ] as const;

  for (const [size, height, padding] of sizes) {
    it(`is ${height}px high with ${padding} inline padding at ${size}`, async () => {
      const screen = await render(
        <Select aria-label="Fruit" size={size}>
          <option value="apple">Apple</option>
        </Select>,
      );
      const select = screen.getByLabelText('Fruit').element() as HTMLElement;

      expect(select.offsetHeight).toBe(height);
      expect(getComputedStyle(select).paddingInlineStart).toBe(padding);
    });
  }

  it('renders as medium without a size', async () => {
    const screen = await render(
      <Select aria-label="Fruit">
        <option value="apple">Apple</option>
      </Select>,
    );
    const select = screen.getByLabelText('Fruit').element() as HTMLElement;

    expect(select.offsetHeight).toBe(48);
    expect(getComputedStyle(select).paddingInlineStart).toBe('24px');
  });
});

describe('Select chevron (browser)', () => {
  // momotaro start padding per size: space 3/4/5
  const sizes = [
    ['small', 16],
    ['medium', 24],
    ['large', 32],
  ] as const;

  for (const [size, padding] of sizes) {
    it(`keeps the value clear of the chevron at ${size}`, async () => {
      const screen = await render(
        <div style={{ display: 'inline-block' }}>
          <Select aria-label="Label" size={size}>
            <option value="label">Filter by Label</option>
          </Select>
        </div>,
      );
      const select = screen.getByLabelText('Label').element() as HTMLElement;
      const chevron = select.parentElement?.querySelector('svg');

      if (!chevron) {
        throw new Error('Chevron not rendered');
      }

      const selectRect = select.getBoundingClientRect();
      const chevronRect = chevron.getBoundingClientRect();
      const valueEnd =
        selectRect.right -
        Number.parseFloat(getComputedStyle(select).paddingInlineEnd);

      expect(chevronRect.left - valueEnd).toBeGreaterThanOrEqual(8);
      expect(selectRect.right - chevronRect.right).toBe(padding);
    });
  }
});
