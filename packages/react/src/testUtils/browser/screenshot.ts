import { it } from 'vitest';

declare const __CI__: boolean;

// Screenshot baselines are gitignored and named per platform (for example
// `-chromium-darwin`), so a fresh CI checkout on Linux has none and every
// screenshot test would fail. Skip them on CI; they run locally. `__CI__` is
// defined in vitest.browser.config.ts.
export function itScreenshot(name: string, test: () => Promise<void> | void) {
  it.skipIf(__CI__)(name, test);
}
