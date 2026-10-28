import { describe, expect, it } from 'vitest';

import { makeVanillaTheme } from './makeVanillaTheme.js';

describe('makeVanillaTheme typography', () => {
  const typography = {
    fontFamily: {},
    fontSize: { display: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)' },
    fontWeight: {},
    lineHeight: { compact: 1.1 },
    letterSpacing: { wide: '0.05em' },
  };
  const theme = makeVanillaTheme({
    typography,
    color: {
      focus: '#7FE3F0',
      primary: { 500: '#7265E3' },
    },
    spacing: {},
    border: { radius: {}, width: {} },
    transition: {},
    // biome-ignore lint/suspicious/noExplicitAny: only typography is relevant here
  } as any);

  it('exposes letterSpacing tokens', () => {
    expect(theme.letterSpacing.wide).toBe('0.05em');
  });

  it('exposes the display font size and line height', () => {
    expect(theme.fontSize.display).toBe('clamp(2rem, 1.5rem + 2.5vw, 3.5rem)');
    expect(theme.lineHeight.compact).toBe(1.1);
  });

  it('exposes semantic and palette color tokens', () => {
    expect(theme.color.focus).toBe('#7FE3F0');
    expect(theme.color['primary-500']).toBe('#7265E3');
  });
});
