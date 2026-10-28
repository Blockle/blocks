import { vars } from '@blockle/blocks-core';
import { afterEach, describe, expect, it } from 'vitest';

import { contrast, resolve } from '../../../testUtils/browser/contrast.js';
import { emulateColorScheme } from '../../../testUtils/browser/emulateColorScheme.js';

describe('Focus ring (browser)', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  // WCAG 2.2 non-text contrast (1.4.11 / 2.4.13) asks for at least 3:1.
  for (const mode of ['light', 'dark'] as const) {
    it(`has at least 3:1 contrast against surface.default in ${mode} mode`, async () => {
      const ring = await resolve(vars.colorRole.focusRing.color, mode);
      const surface = await resolve(vars.colorRole.surface.default, mode);

      expect(contrast(ring, surface)).toBeGreaterThanOrEqual(3);
    });
  }
});
