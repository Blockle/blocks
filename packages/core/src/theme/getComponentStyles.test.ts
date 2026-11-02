import { describe, expect, expectTypeOf, it } from 'vitest';

import type { ThemeVariantsArg } from '../config/componentThemes.js';
import type { Theme } from '../theme/makeTheme.js';
import { getComponentStyles } from './getComponentStyles.js';

// Tests build partial themes; the cast is the only place that knows it.
function themeWith(button: unknown, tag: unknown = {}): Theme {
  return { components: { button, tag } } as unknown as Theme;
}

const testTheme = themeWith({
  root: 'btn-base',
  variants: {
    size: { small: 'btn-sm', large: 'btn-lg' },
    intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
    disabled: 'btn-disabled',
  },
});

const tagTheme = themeWith(
  {},
  {
    root: 'tag-base',
    startSlot: 'tag-start',
    variants: { size: { small: 'tag-sm', large: 'tag-lg' } },
    defaultVariants: { size: 'large' },
  },
);

const themeWithDefaults = themeWith({
  root: 'btn-base',
  variants: {
    size: { small: 'btn-sm', large: 'btn-lg' },
    intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
  },
  defaultVariants: { size: 'large' },
  compoundVariants: [
    {
      variants: { size: 'small', intent: 'primary' },
      style: 'btn-small-primary',
    },
    {
      variants: { size: 'large', intent: 'primary' },
      style: 'btn-large-primary',
    },
  ],
});

describe('getComponentStyles', () => {
  describe('elements', () => {
    it('returns the class of the requested element', () => {
      expect(getComponentStyles(testTheme, 'button', 'root')).toBe('btn-base');
      expect(getComponentStyles(tagTheme, 'tag', 'startSlot')).toBe(
        'tag-start',
      );
    });

    it('returns an empty string for an element the theme does not define', () => {
      expect(getComponentStyles(themeWith({}), 'button', 'root')).toBe('');
    });
  });

  describe('variants follow the call', () => {
    it('adds no variant classes when variants are not passed, despite defaults', () => {
      expect(getComponentStyles(tagTheme, 'tag', 'startSlot')).toBe(
        'tag-start',
      );
    });

    it('adds no compound variants when variants are not passed', () => {
      expect(getComponentStyles(themeWithDefaults, 'button', 'root')).toBe(
        'btn-base',
      );
    });

    it('picks up default variants when variants is an empty object', () => {
      expect(getComponentStyles(themeWithDefaults, 'button', 'root', {})).toBe(
        'btn-base btn-lg',
      );
    });

    it('applies passed variants to whichever element is asked for', () => {
      expect(
        getComponentStyles(tagTheme, 'tag', 'startSlot', { size: 'small' }),
      ).toBe('tag-start tag-sm');
    });

    it('overrides default variants with passed variants', () => {
      expect(
        getComponentStyles(themeWithDefaults, 'button', 'root', {
          size: 'small',
        }),
      ).toBe('btn-base btn-sm');
    });

    it('applies boolean variants only when true', () => {
      expect(
        getComponentStyles(testTheme, 'button', 'root', { disabled: true }),
      ).toBe('btn-base btn-disabled');
      expect(
        getComponentStyles(testTheme, 'button', 'root', { disabled: false }),
      ).toBe('btn-base');
    });

    it('skips undefined variant values', () => {
      expect(
        getComponentStyles(testTheme, 'button', 'root', { size: undefined }),
      ).toBe('btn-base');
    });

    it('ignores variant values the theme does not define', () => {
      expect(
        getComponentStyles(testTheme, 'button', 'root', {
          size: 'medium' as unknown as 'small',
        }),
      ).toBe('btn-base');
    });

    it('ignores variants when the theme declares none', () => {
      const theme = themeWith({ root: 'btn-base', variants: {} });

      expect(
        getComponentStyles(theme, 'button', 'root', { size: 'small' }),
      ).toBe('btn-base');
    });
  });

  describe('compound variants', () => {
    it('applies a compound variant when all conditions match', () => {
      expect(
        getComponentStyles(themeWithDefaults, 'button', 'root', {
          size: 'small',
          intent: 'primary',
        }),
      ).toBe('btn-base btn-sm btn-primary btn-small-primary');
    });

    it('skips a compound variant when a condition does not match', () => {
      expect(
        getComponentStyles(testTheme, 'button', 'root', {
          size: 'large',
          intent: 'primary',
        }),
      ).toBe('btn-base btn-lg btn-primary');
    });

    it('matches compound variants through default variants', () => {
      expect(
        getComponentStyles(themeWithDefaults, 'button', 'root', {
          intent: 'primary',
        }),
      ).toBe('btn-base btn-lg btn-primary btn-large-primary');
    });

    it('prefers passed variants over defaults when matching', () => {
      const theme = themeWith({
        root: 'btn-base',
        variants: {
          size: { small: 'btn-sm', large: 'btn-lg' },
          intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
        },
        defaultVariants: { size: 'large', intent: 'secondary' },
        compoundVariants: [
          {
            variants: { size: 'small', intent: 'primary' },
            style: 'btn-small-primary',
          },
        ],
      });

      expect(
        getComponentStyles(theme, 'button', 'root', {
          size: 'small',
          intent: 'primary',
        }),
      ).toBe('btn-base btn-sm btn-primary btn-small-primary');
    });

    it('handles an empty compoundVariants array', () => {
      const theme = themeWith({
        root: 'btn-base',
        variants: { size: { small: 'btn-sm' } },
        compoundVariants: [],
      });

      expect(
        getComponentStyles(theme, 'button', 'root', { size: 'small' }),
      ).toBe('btn-base btn-sm');
    });

    it('applies multiple compound variants in order', () => {
      const theme = themeWith({
        root: 'btn-base',
        variants: {
          size: { small: 'btn-sm' },
          intent: { primary: 'btn-primary' },
          disabled: 'btn-disabled',
        },
        compoundVariants: [
          {
            variants: { size: 'small', intent: 'primary' },
            style: 'btn-small-primary',
          },
          {
            variants: { intent: 'primary', disabled: true },
            style: 'btn-primary-disabled',
          },
        ],
      });

      expect(
        getComponentStyles(theme, 'button', 'root', {
          size: 'small',
          intent: 'primary',
          disabled: true,
        }),
      ).toBe(
        'btn-base btn-sm btn-primary btn-disabled btn-small-primary btn-primary-disabled',
      );
    });
  });
});

// The calls in type tests are checked by tsc and never run.
function typeCheck(_check: () => void) {}

describe('getComponentStyles types', () => {
  it('rejects variants and unknown names as an element', () => {
    typeCheck(() => {
      // @ts-expect-error variants is not an Element
      getComponentStyles(testTheme, 'button', 'variants');
      // @ts-expect-error unknown Element
      getComponentStyles(testTheme, 'button', 'nope');
      // @ts-expect-error an Element of another component
      getComponentStyles(testTheme, 'button', 'startSlot');
    });
  });

  it('rejects variants for a theme without variants', () => {
    typeCheck(() => {
      // @ts-expect-error menu declares no variants
      getComponentStyles(testTheme, 'menu', 'list', {});
      getComponentStyles(testTheme, 'menu', 'list');
    });
  });

  it('accepts a partial of the theme variants only', () => {
    typeCheck(() => {
      getComponentStyles(testTheme, 'button', 'root', {});
      getComponentStyles(testTheme, 'button', 'root', { size: 'small' });
      // @ts-expect-error not a size
      getComponentStyles(testTheme, 'button', 'root', { size: 'huge' });
      // @ts-expect-error not a variant
      getComponentStyles(testTheme, 'button', 'root', { nope: true });
    });
  });

  it('accepts variants when the variants key is optional', () => {
    expectTypeOf<
      ThemeVariantsArg<{ root: string; variants?: { a: boolean } }>
    >().toEqualTypeOf<[variants?: { a?: boolean }]>();
    expectTypeOf<ThemeVariantsArg<{ root: string }>>().toEqualTypeOf<[]>();
  });
});
