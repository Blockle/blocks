import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Box } from './Box.js';

describe('Box (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it('computes the color of a color atom from the momotaro theme', async () => {
    const screen = await render(<Box color="primary-700">Box content</Box>);

    const element = screen.getByText('Box content').element();

    // primary-700 is #4D3CAB in the momotaro tokens
    expect(getComputedStyle(element).color).toBe('rgb(77, 60, 171)');
  });

  describe('mode values', () => {
    const primary = 'rgb(77, 60, 171)'; // primary-700
    const white = 'rgb(255, 255, 255)';
    const neutral = 'rgb(26, 26, 26)'; // neutral-900

    const renderBox = async (
      colorMode: 'light' | 'dark' | 'system',
    ): Promise<HTMLElement> => {
      const screen = await render(
        <Box
          color={{ light: 'primary-700', dark: 'white' }}
          backgroundColor={{ light: 'white', dark: 'primary-700' }}
          borderColor={{ light: 'neutral-900', dark: 'white' }}
          borderStyle="solid"
          borderWidth="thin"
        >
          Box content
        </Box>,
        { colorMode },
      );

      return screen.getByText('Box content').element() as HTMLElement;
    };

    it('uses the light values in light mode', async () => {
      const style = getComputedStyle(await renderBox('light'));

      expect(style.color).toBe(primary);
      expect(style.backgroundColor).toBe(white);
      expect(style.borderTopColor).toBe(neutral);
    });

    it('uses the dark values in dark mode', async () => {
      const style = getComputedStyle(await renderBox('dark'));

      expect(style.color).toBe(white);
      expect(style.backgroundColor).toBe(primary);
      expect(style.borderTopColor).toBe(white);
    });

    it('uses the light values in system mode with a light OS preference', async () => {
      await emulateColorScheme('light');

      const style = getComputedStyle(await renderBox('system'));

      expect(style.color).toBe(primary);
      expect(style.backgroundColor).toBe(white);
      expect(style.borderTopColor).toBe(neutral);
    });

    it('uses the dark values in system mode with a dark OS preference', async () => {
      await emulateColorScheme('dark');

      const style = getComputedStyle(await renderBox('system'));

      expect(style.color).toBe(white);
      expect(style.backgroundColor).toBe(primary);
      expect(style.borderTopColor).toBe(white);
    });

    it('adds no inline style', async () => {
      const element = await renderBox('dark');

      expect(element.hasAttribute('style')).toBe(false);
    });

    it('keeps a plain shade the same in every mode', async () => {
      for (const mode of ['light', 'dark'] as const) {
        const screen = await render(
          <Box color="primary-700">Plain {mode}</Box>,
          { colorMode: mode },
        );

        const element = screen.getByText(`Plain ${mode}`).element();

        expect(getComputedStyle(element).color).toBe(primary);
        await screen.unmount();
      }
    });
  });
});
