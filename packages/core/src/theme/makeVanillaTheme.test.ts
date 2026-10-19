import { describe, expect, it } from 'vitest';

import { colorRoles } from '../config/colorRoles.js';
import type {
  PaletteTokens,
  SchemeTokens,
  ThemeTokens,
} from '../config/themeTokens.js';
import { makeVanillaTheme } from './makeVanillaTheme.js';

function makeScheme(prefix: string): SchemeTokens {
  const color = Object.fromEntries(
    colorRoles.map((role) => [role, `${prefix}-${role}`]),
  ) as SchemeTokens['color'];

  return {
    color,
    shadow: {
      1: `${prefix}-shadow-1`,
      2: `${prefix}-shadow-2`,
      3: `${prefix}-shadow-3`,
      4: `${prefix}-shadow-4`,
      5: `${prefix}-shadow-5`,
    },
  };
}

const tokens = {
  typography: {
    fontFamily: {},
    fontSize: { display: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)' },
    fontWeight: {},
    lineHeight: { compact: 1.1 },
    letterSpacing: { wide: '0.05em' },
  },
  spacing: { 1: '4px' },
  border: { radius: { 1: '4px' }, width: { thin: '1px' } },
  transition: { fast: '80ms' },
} as unknown as ThemeTokens;

const palette = {
  white: '#fff',
  black: '#000',
  primary: { 500: '#7265E3' },
} as unknown as PaletteTokens;

const theme = makeVanillaTheme({
  tokens,
  palette,
  schemes: { light: makeScheme('light'), dark: makeScheme('dark') },
});

describe('makeVanillaTheme', () => {
  it('exposes letterSpacing tokens', () => {
    expect(theme.base.letterSpacing.wide).toBe('0.05em');
  });

  it('exposes the display font size and line height', () => {
    expect(theme.base.fontSize.display).toBe(
      'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
    );
    expect(theme.base.lineHeight.compact).toBe(1.1);
  });

  it('lists the Color roles named in spec #253', () => {
    expect(colorRoles).toEqual(
      expect.arrayContaining([
        'surface',
        'surfaceInverse',
        'textDisabled',
        'borderStrong',
        'overlay',
        'focusRing',
        'primary',
        'neutralHover',
        'warningSubtle',
        'onDanger',
      ]),
    );
    expect(colorRoles).toHaveLength(40);
  });

  it('returns every color role in both schemes', () => {
    for (const role of colorRoles) {
      expect(theme.base.color).toHaveProperty(role, `light-${role}`);
      expect(theme.dark.color).toHaveProperty(role, `dark-${role}`);
    }

    expect(Object.keys(theme.dark.color).sort()).toEqual(
      [...colorRoles].sort(),
    );
  });

  it('returns shadows in both schemes', () => {
    expect(theme.base.shadow[3]).toBe('light-shadow-3');
    expect(theme.dark.shadow[3]).toBe('dark-shadow-3');
  });

  it('has no focus box shadow token; the focusRing role replaces it', () => {
    expect(theme.base).not.toHaveProperty('focus');
  });

  it('defines scheme-independent tokens once, outside the dark scheme', () => {
    expect(theme.base.space[1]).toBe('4px');
    expect(theme.base.borderRadius[1]).toBe('4px');
    expect(theme.base.transition.fast).toBe('80ms');
    expect(Object.keys(theme.dark).sort()).toEqual(['color', 'shadow']);
  });

  it('exposes the palette as its own group', () => {
    expect(theme.base.palette['primary-500']).toBe('#7265E3');
    expect(theme.base.palette.white).toBe('#fff');
    expect(theme.base.palette).not.toHaveProperty('surface');
  });

  it('keeps only Color roles in the color group', () => {
    expect(Object.keys(theme.base.color).sort()).toEqual(
      [...colorRoles].sort(),
    );
  });
});

describe('makeVanillaTheme types', () => {
  it('requires both schemes and every role', () => {
    const light = makeScheme('light');
    const { surface: _surface, ...colorWithoutSurface } = light.color;

    // Type-only assertions; the calls are never executed.
    const assertTypes = () => {
      // @ts-expect-error dark scheme is required
      makeVanillaTheme({ tokens, palette, schemes: { light } });

      makeVanillaTheme({
        tokens,
        palette,
        schemes: {
          light,
          // @ts-expect-error every role is required in each scheme
          dark: { ...light, color: colorWithoutSurface },
        },
      });
    };

    expect(assertTypes).toBeTypeOf('function');
  });

  it('rejects the removed focus token', () => {
    const schemes = { light: makeScheme('light'), dark: makeScheme('dark') };

    const assertTypes = () => {
      makeVanillaTheme({
        // @ts-expect-error focus.boxShadow is removed; use the focusRing role
        tokens: { ...tokens, focus: { boxShadow: 'none' } },
        palette,
        schemes,
      });
    };

    expect(assertTypes).toBeTypeOf('function');
  });

  it('rejects removed palettes and the old color shape', () => {
    const light = makeScheme('light');
    const dark = makeScheme('dark');
    const schemes = { light, dark };
    const scale = palette.primary;

    const assertTypes = () => {
      makeVanillaTheme({
        tokens,
        // @ts-expect-error the text palette is removed
        palette: { ...palette, text: scale },
        schemes,
      });

      makeVanillaTheme({
        tokens,
        // @ts-expect-error the background palette is removed
        palette: { ...palette, background: scale },
        schemes,
      });

      makeVanillaTheme({
        // @ts-expect-error the old color group is not a token
        tokens: { ...tokens, color: palette },
        palette,
        schemes,
      });
    };

    expect(assertTypes).toBeTypeOf('function');
  });
});
