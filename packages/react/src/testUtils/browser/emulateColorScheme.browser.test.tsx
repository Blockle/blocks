import { afterEach, describe, expect, it } from 'vitest';

import { emulateColorScheme } from './emulateColorScheme.js';

describe('emulateColorScheme', () => {
  afterEach(async () => {
    await emulateColorScheme('light');
  });

  it('switches prefers-color-scheme between light and dark mid-test', async () => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');

    await emulateColorScheme('dark');
    expect(query.matches).toBe(true);

    await emulateColorScheme('light');
    expect(query.matches).toBe(false);

    await emulateColorScheme('dark');
    expect(query.matches).toBe(true);
  });

  it('applies to CSS media queries', async () => {
    const style = document.createElement('style');

    style.textContent = `
      .probe { color: rgb(1, 2, 3); }
      @media (prefers-color-scheme: dark) { .probe { color: rgb(4, 5, 6); } }
    `;
    document.head.append(style);

    const probe = document.createElement('div');

    probe.className = 'probe';
    document.body.append(probe);

    await emulateColorScheme('light');
    expect(getComputedStyle(probe).color).toBe('rgb(1, 2, 3)');

    await emulateColorScheme('dark');
    expect(getComputedStyle(probe).color).toBe('rgb(4, 5, 6)');

    probe.remove();
    style.remove();
  });
});
