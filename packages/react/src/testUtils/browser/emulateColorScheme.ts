/// <reference types="@vitest/browser-playwright" />

import { cdp } from 'vitest/browser';

export type EmulatedColorScheme = 'light' | 'dark';

/**
 * Emulates the OS preference (`prefers-color-scheme`) of the browser under test.
 * Can be called repeatedly to switch mid-test. Chromium only.
 */
export async function emulateColorScheme(
  scheme: EmulatedColorScheme,
): Promise<void> {
  await cdp().send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-color-scheme', value: scheme }],
  });
}
