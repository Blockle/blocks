import { describe, expect, it } from 'vitest';

import { makeVanillaTheme } from './makeVanillaTheme.js';

describe('makeVanillaTheme typography', () => {
  const typography = {
    fontFamily: {},
    fontSize: { display: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)' },
    fontWeight: {},
    lineHeight: { display: 1.1 },
    letterSpacing: { wide: '0.05em' },
  };
  // biome-ignore lint/suspicious/noExplicitAny: only typography is relevant here
  const theme = makeVanillaTheme({
    typography,
    color: {},
    spacing: {},
    border: { radius: {}, width: {} },
    transition: {},
    shadow: {},
    focus: { boxShadow: '' },
  } as any);

  it('exposes letterSpacing tokens', () => {
    expect(theme.letterSpacing.wide).toBe('0.05em');
  });

  it('exposes the display font size and line height', () => {
    expect(theme.fontSize.display).toBe('clamp(2rem, 1.5rem + 2.5vw, 3.5rem)');
    expect(theme.lineHeight.display).toBe(1.1);
  });
});
