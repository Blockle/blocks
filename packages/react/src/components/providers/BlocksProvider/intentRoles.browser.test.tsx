import { vars } from '@blockle/blocks-core';
import { afterEach, describe, expect, it } from 'vitest';

import { contrast, resolve } from '../../../testUtils/browser/contrast.js';
import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';

const intents = [
  ['primary', vars.colorRole.primary],
  ['secondary', vars.colorRole.secondary],
  ['neutral', vars.colorRole.neutral],
  ['danger', vars.colorRole.danger],
  ['success', vars.colorRole.success],
  ['info', vars.colorRole.info],
  ['warning', vars.colorRole.warning],
] as const;

const roles = [
  'solid',
  'solidHover',
  'subtle',
  'contrast',
  'foreground',
  'border',
] as const;

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
    expect(await resolve(vars.colorRole.primary.solid, 'light')).toBe(
      'rgb(94, 77, 186)',
    );
    expect(await resolve(vars.colorRole.primary.solid, 'dark')).toBe(
      'rgb(164, 136, 255)',
    );
    // momotaro danger.border: danger-300 (#FF9B90) light, danger-700 (#B32422) dark
    expect(await resolve(vars.colorRole.danger.border, 'light')).toBe(
      'rgb(255, 155, 144)',
    );
    expect(await resolve(vars.colorRole.danger.border, 'dark')).toBe(
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
