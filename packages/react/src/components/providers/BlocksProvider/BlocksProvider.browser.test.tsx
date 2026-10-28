import { useRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Box } from '../../layout/Box/Box.js';
import { Popover } from '../../overlay/Popover/Popover.js';
import { Portal } from '../../overlay/Portal/Portal.js';
import { Text } from '../../typography/Text/Text.js';

const darkDefault = 'rgb(247, 247, 247)';

const colorScheme = () =>
  getComputedStyle(document.documentElement).colorScheme;

const PopoverInPortal = () => {
  const anchor = useRef<HTMLElement | null>(null);

  return (
    <Portal>
      <Popover open anchorElement={anchor} onRequestClose={() => {}}>
        <Text>Popover content</Text>
      </Popover>
    </Portal>
  );
};

describe('BlocksProvider color mode (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it('sets color-scheme on <html> to light in light mode', async () => {
    await render(<Text>Hello</Text>, { colorMode: 'light' });

    expect(colorScheme()).toBe('light');
  });

  it('sets color-scheme on <html> to dark in dark mode', async () => {
    await render(<Text>Hello</Text>, { colorMode: 'dark' });

    expect(colorScheme()).toBe('dark');
  });

  it('sets color-scheme to "light dark" under system', async () => {
    await render(<Text>Hello</Text>, { colorMode: 'system' });

    expect(colorScheme()).toBe('light dark');
  });

  it('follows the OS preference when no colorMode is given', async () => {
    await emulateColorScheme('dark');

    const screen = await render(<Text>Hello</Text>);

    expect(colorScheme()).toBe('light dark');
    expect(getComputedStyle(screen.getByText('Hello').element()).color).toBe(
      darkDefault,
    );

    await emulateColorScheme('light');

    expect(
      getComputedStyle(screen.getByText('Hello').element()).color,
    ).not.toBe(darkDefault);
  });

  it('renders portaled content in the page color mode', async () => {
    const screen = await render(<PopoverInPortal />, { colorMode: 'dark' });

    const content = screen.getByText('Popover content').element();

    expect(getComputedStyle(content).color).toBe(darkDefault);
    expect(document.documentElement.dataset.colorMode).toBe('dark');
  });

  describe('without a data-color-mode attribute (before hydration)', () => {
    const renderWithoutAttribute = async () => {
      const screen = await render(
        <Box color={{ light: 'primary-700', dark: 'white' }}>
          <Text>Hello</Text>
        </Box>,
      );

      document.documentElement.removeAttribute('data-color-mode');

      return screen;
    };

    it('behaves like system: dark role colors under a dark OS', async () => {
      await emulateColorScheme('dark');

      const screen = await renderWithoutAttribute();

      expect(getComputedStyle(screen.getByText('Hello').element()).color).toBe(
        darkDefault,
      );
    });

    it('behaves like system: dark Mode-value atom colors under a dark OS', async () => {
      await emulateColorScheme('dark');

      const screen = await renderWithoutAttribute();
      const box = screen.getByText('Hello').element().parentElement as Element;

      expect(getComputedStyle(box).color).toBe('rgb(255, 255, 255)');
    });

    it('sets color-scheme to "light dark"', async () => {
      await renderWithoutAttribute();

      expect(colorScheme()).toBe('light dark');
    });

    it('uses light colors under a light OS', async () => {
      const screen = await renderWithoutAttribute();
      const box = screen.getByText('Hello').element().parentElement as Element;

      expect(getComputedStyle(box).color).toBe('rgb(77, 60, 171)');
    });
  });
});
