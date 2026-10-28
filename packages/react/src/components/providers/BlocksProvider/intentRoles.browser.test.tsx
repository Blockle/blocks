import { vars } from '@blockle/blocks-core';
import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';

const intents = [
  ['primary', vars.colorRole.intentPrimary],
  ['secondary', vars.colorRole.intentSecondary],
  ['neutral', vars.colorRole.intentNeutral],
  ['danger', vars.colorRole.intentDanger],
  ['success', vars.colorRole.intentSuccess],
  ['info', vars.colorRole.intentInfo],
  ['warning', vars.colorRole.intentWarning],
] as const;

const roles = [
  'solid',
  'solidHover',
  'subtle',
  'contrast',
  'foreground',
  'border',
] as const;

/** Resolves a CSS `var(--x)` reference to a computed rgb() string. */
async function resolve(cssVar: string, colorMode: 'light' | 'dark') {
  const screen = await render(
    <div data-testid="probe" style={{ color: cssVar }} />,
    {
      colorMode,
    },
  );
  const color = getComputedStyle(screen.getByTestId('probe').element()).color;

  await screen.unmount();

  return color;
}

const channels = (rgb: string) =>
  (rgb.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);

function luminance(rgb: string) {
  const [r = 0, g = 0, b = 0] = channels(rgb).map((value) => {
    const c = value / 255;

    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [high = 0, low = 0] = [luminance(a), luminance(b)].sort(
    (x, y) => y - x,
  );

  return (high + 0.05) / (low + 0.05);
}

describe('Intent color roles (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it('exposes all six roles for every Intent', () => {
    for (const [, group] of intents) {
      expect(Object.keys(group).sort()).toEqual([...roles].sort());
    }
  });

  it('resolves sampled roles to their light and dark values', async () => {
    // momotaro primary.solid: primary-600 (#5E4DBA) light, primary-300 (#A488FF) dark
    expect(await resolve(vars.colorRole.intentPrimary.solid, 'light')).toBe(
      'rgb(94, 77, 186)',
    );
    expect(await resolve(vars.colorRole.intentPrimary.solid, 'dark')).toBe(
      'rgb(164, 136, 255)',
    );
    // momotaro danger.border: danger-300 (#FF9B90) light, danger-700 (#B32422) dark
    expect(await resolve(vars.colorRole.intentDanger.border, 'light')).toBe(
      'rgb(255, 155, 144)',
    );
    expect(await resolve(vars.colorRole.intentDanger.border, 'dark')).toBe(
      'rgb(179, 36, 34)',
    );
  });

  for (const mode of ['light', 'dark'] as const) {
    it(`meets WCAG AA for contrast on solid in ${mode} mode, for every Intent`, async () => {
      for (const [name, group] of intents) {
        const solid = await resolve(group.solid, mode);
        const content = await resolve(group.contrast, mode);

        expect(
          contrast(solid, content),
          `${name} ${mode}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
});
