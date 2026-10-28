import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Button } from './Button.js';

// momotaro intentPrimary.solid: primary-600 (#5E4DBA) in light, primary-300 (#A488FF) in dark
const lightSolid = 'rgb(94, 77, 186)';
const darkSolid = 'rgb(164, 136, 255)';
// momotaro intentPrimary.contrast: white in light, neutral-900 (#1A1A1A) in dark
const lightContrast = 'rgb(255, 255, 255)';
const darkContrast = 'rgb(26, 26, 26)';
// momotaro intentPrimary.solidHover: primary-700 (#4D3CAB) in light, primary-400 (#8660FF) in dark
const lightSolidHover = 'rgb(77, 60, 171)';
const darkSolidHover = 'rgb(134, 96, 255)';
// momotaro intentDanger.solid: danger-700 (#B32422) in light, danger-400 (#FF7A70) in dark
const lightDangerSolid = 'rgb(179, 36, 34)';
const darkDangerSolid = 'rgb(255, 122, 112)';

const styleOf = (element: Element) => getComputedStyle(element);

describe('Button colors (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  describe('solid primary', () => {
    it('uses the intent solid and contrast roles in light mode', async () => {
      const screen = await render(<Button>Save</Button>, {
        colorMode: 'light',
      });
      const style = styleOf(screen.getByRole('button').element());

      expect(style.backgroundColor).toBe(lightSolid);
      expect(style.color).toBe(lightContrast);
    });

    it('uses the dark role values in dark mode', async () => {
      const screen = await render(<Button>Save</Button>, {
        colorMode: 'dark',
      });
      const style = styleOf(screen.getByRole('button').element());

      expect(style.backgroundColor).toBe(darkSolid);
      expect(style.color).toBe(darkContrast);
    });

    it('uses solidHover on hover in both modes', async () => {
      for (const [colorMode, expected] of [
        ['light', lightSolidHover],
        ['dark', darkSolidHover],
      ] as const) {
        const screen = await render(<Button>Save</Button>, { colorMode });
        const button = screen.getByRole('button');

        await button.hover();
        expect(styleOf(button.element()).backgroundColor).toBe(expected);
        // The pointer stays where it is between tests; a later button
        // rendered under it would start out hovered.
        await button.unhover();
        await screen.unmount();
      }
    });
  });

  describe('outline primary', () => {
    it('colors text and border with the intent solid role in both modes', async () => {
      for (const [colorMode, expected] of [
        ['light', lightSolid],
        ['dark', darkSolid],
      ] as const) {
        const screen = await render(<Button variant="outline">Save</Button>, {
          colorMode,
        });
        const style = styleOf(screen.getByRole('button').element());

        expect(style.color).toBe(expected);
        expect(style.borderColor).toBe(expected);
        expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
        await screen.unmount();
      }
    });
  });

  describe('solid danger', () => {
    it('uses the danger intent roles in both modes', async () => {
      for (const [colorMode, expected] of [
        ['light', lightDangerSolid],
        ['dark', darkDangerSolid],
      ] as const) {
        const screen = await render(<Button intent="danger">Delete</Button>, {
          colorMode,
        });

        expect(
          styleOf(screen.getByRole('button').element()).backgroundColor,
        ).toBe(expected);
        await screen.unmount();
      }
    });
  });
});
