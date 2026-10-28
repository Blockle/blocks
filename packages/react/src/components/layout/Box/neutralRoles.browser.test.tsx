import { vars } from '@blockle/blocks-core';
import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';
import { render } from '../../../testUtils/browser/render.js';
import { Box } from './Box.js';

const { surface, border, overlay, focusRing } = vars.colorRole;

type Screen = Awaited<ReturnType<typeof render>>;

// momotaro neutral roles: [light, dark]
const expectedColors = {
  surface: ['rgb(255, 255, 255)', 'rgb(26, 26, 26)'],
  border: ['rgb(225, 225, 225)', 'rgb(60, 60, 60)'],
  overlay: ['rgba(13, 13, 13, 0.4)', 'rgba(0, 0, 0, 0.6)'],
  focusRing: ['rgb(134, 96, 255)', 'rgb(168, 238, 246)'],
} as const;

const shadow3 = [
  'rgba(0, 0, 0, 0.08) 0px 16px 24px 0px',
  'rgba(0, 0, 0, 0.5) 0px 16px 24px 0px',
] as const;
const focusShadow = [
  'rgb(134, 96, 255) 0px 0px 1px 2px',
  'rgb(168, 238, 246) 0px 0px 1px 2px',
] as const;

function Sample() {
  return (
    <>
      <div data-testid="surface" style={{ backgroundColor: surface.default }} />
      <div data-testid="border" style={{ backgroundColor: border.default }} />
      <div data-testid="overlay" style={{ backgroundColor: overlay.default }} />
      <div
        data-testid="focusRing"
        style={{ backgroundColor: focusRing.color }}
      />
      <Box data-testid="shadow" boxShadow={3} />
      <div data-testid="focus" style={{ boxShadow: focusRing.boxShadow }} />
    </>
  );
}

function read(
  screen: Screen,
  id: string,
  property: 'backgroundColor' | 'boxShadow',
) {
  return getComputedStyle(screen.getByTestId(id).element())[property];
}

function sample(screen: Screen, index: 0 | 1) {
  for (const group of Object.keys(expectedColors) as Array<
    keyof typeof expectedColors
  >) {
    expect(read(screen, group, 'backgroundColor')).toBe(
      expectedColors[group][index],
    );
  }

  expect(read(screen, 'shadow', 'boxShadow')).toBe(shadow3[index]);
  expect(read(screen, 'focus', 'boxShadow')).toBe(focusShadow[index]);
}

describe('neutral roles, shadows and focus ring (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it('resolves light values under light', async () => {
    sample(await render(<Sample />, { colorMode: 'light' }), 0);
  });

  it('resolves dark values under dark', async () => {
    sample(await render(<Sample />, { colorMode: 'dark' }), 1);
  });

  it('follows the emulated OS preference under system', async () => {
    await emulateColorScheme('light');

    const screen = await render(<Sample />, { colorMode: 'system' });

    sample(screen, 0);

    await emulateColorScheme('dark');

    sample(screen, 1);
  });
});
