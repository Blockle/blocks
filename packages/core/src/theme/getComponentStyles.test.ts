import { describe, expect, it } from 'vitest';

import type { Theme } from '../theme/makeTheme.js';
import { getComponentStyles } from './getComponentStyles.js';

// Tests build partial themes; the cast is the only place that knows it.
function themeWith(button: unknown): Theme {
  return { components: { button } } as unknown as Theme;
}

const testTheme = themeWith({
  root: 'btn-base',
  startSlot: 'btn-start',
  variants: {
    size: { small: 'btn-sm', large: 'btn-lg' },
    intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
    disabled: 'btn-disabled',
  },
});

const themeWithDefaults = themeWith({
  root: 'btn-base',
  startSlot: 'btn-start',
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
      expect(
        getComponentStyles(testTheme, 'button', 'startSlot' as never),
      ).toBe('btn-start');
    });

    it('returns an empty string for an element the theme does not define', () => {
      const theme = themeWith({ root: 'btn-base' });

      expect(getComponentStyles(theme, 'button', 'startSlot' as never)).toBe(
        '',
      );
    });
  });

  describe('variants follow the call', () => {
    it('adds no variant classes when variants are not passed, despite defaults', () => {
      expect(
        getComponentStyles(themeWithDefaults, 'button', 'startSlot' as never),
      ).toBe('btn-start');
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
        getComponentStyles(testTheme, 'button', 'startSlot' as never, {
          size: 'small',
        }),
      ).toBe('btn-start btn-sm');
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
