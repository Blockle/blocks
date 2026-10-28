import { afterEach, describe, expect, it, vi } from 'vitest';

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const guide = readFileSync(resolve(__dirname, 'ColorMode.mdx'), 'utf8');

function getHeadScript() {
  const match = guide.match(/<script>([\s\S]*?)<\/script>/);

  if (!match?.[1]) {
    throw new Error('ColorMode.mdx has no <script> snippet');
  }

  return match[1];
}

function runHeadScript() {
  // biome-ignore lint/security/noGlobalEval: runs the documented snippet
  window.eval(getHeadScript());
}

describe('Color mode guide: pre-paint head script', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-color-mode');
  });

  it.each(['light', 'dark'])('applies a saved %s choice', (choice) => {
    localStorage.setItem('color-mode', choice);

    runHeadScript();

    expect(document.documentElement.getAttribute('data-color-mode')).toBe(
      choice,
    );
  });

  it('leaves the attribute alone for system or nothing saved', () => {
    runHeadScript();
    expect(document.documentElement.hasAttribute('data-color-mode')).toBe(
      false,
    );

    localStorage.setItem('color-mode', 'system');
    runHeadScript();
    expect(document.documentElement.hasAttribute('data-color-mode')).toBe(
      false,
    );
  });

  it('ignores unknown saved values and unavailable storage', () => {
    localStorage.setItem('color-mode', 'sepia');
    runHeadScript();
    expect(document.documentElement.hasAttribute('data-color-mode')).toBe(
      false,
    );

    const spy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('blocked');
      });

    expect(runHeadScript).not.toThrow();
    spy.mockRestore();
  });
});
