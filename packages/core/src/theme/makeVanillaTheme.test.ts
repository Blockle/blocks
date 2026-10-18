import { describe, expect, it } from 'vitest';

import type {
  PaletteTokens,
  SchemeTokens,
  ThemeTokens,
} from '../config/themeTokens.js';
import { makeVanillaTheme } from './makeVanillaTheme.js';

// Role names as listed in spec #253
const intents = [
  'primary',
  'secondary',
  'neutral',
  'danger',
  'success',
  'info',
  'warning',
];
const colorRoles = [
  'surface',
  'surfaceRaised',
  'surfaceSunken',
  'surfaceInverse',
  'text',
  'textMuted',
  'textInverse',
  'textDisabled',
  'border',
  'borderStrong',
  'overlay',
  'focusRing',
  ...intents.flatMap((intent) => {
    const capitalized = `${intent.charAt(0).toUpperCase()}${intent.slice(1)}`;

    return [intent, `${intent}Hover`, `${intent}Subtle`, `on${capitalized}`];
  }),
];

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
  focus: { boxShadow: '0 0 1px 2px blue' },
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
    expect(theme.light.letterSpacing.wide).toBe('0.05em');
  });

  it('exposes the display font size and line height', () => {
    expect(theme.light.fontSize.display).toBe(
      'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
    );
    expect(theme.light.lineHeight.compact).toBe(1.1);
  });

  it('returns every color role in both schemes', () => {
    for (const role of colorRoles) {
      expect(theme.light.color).toHaveProperty(role, `light-${role}`);
      expect(theme.dark.color).toHaveProperty(role, `dark-${role}`);
    }

    expect(Object.keys(theme.dark.color).sort()).toEqual(
      [...colorRoles].sort(),
    );
  });

  it('returns shadows in both schemes', () => {
    expect(theme.light.shadow[3]).toBe('light-shadow-3');
    expect(theme.dark.shadow[3]).toBe('dark-shadow-3');
  });

  it('defines scheme-independent tokens once, outside the dark scheme', () => {
    expect(theme.light.space[1]).toBe('4px');
    expect(theme.light.borderRadius[1]).toBe('4px');
    expect(theme.light.transition.fast).toBe('80ms');
    expect(theme.light.focus.boxShadow).toBe('0 0 1px 2px blue');
    expect(Object.keys(theme.dark).sort()).toEqual(['color', 'shadow']);
  });

  it('exposes the palette as its own group', () => {
    expect(theme.light.palette['primary-500']).toBe('#7265E3');
    expect(theme.light.palette.white).toBe('#fff');
    expect(theme.light.palette).not.toHaveProperty('surface');
  });

  it('keeps palette values in the color group alongside roles', () => {
    expect(theme.light.color['primary-500']).toBe('#7265E3');
    expect(theme.light.color.black).toBe('#000');
    expect(theme.light.color.surface).toBe('light-surface');
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
});
