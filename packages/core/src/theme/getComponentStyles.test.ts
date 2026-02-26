import { describe, expect, it, vi } from 'vitest';

import type { Theme } from '../theme/makeTheme.js';
import { getComponentStyles } from './getComponentStyles.js';

const testTheme = {
  components: {
    button: {
      root: 'btn-base',
      variants: {
        size: { small: 'btn-sm', large: 'btn-lg' },
        intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
      },
    },
  },
} satisfies Partial<Theme> as unknown as Theme;

describe('getComponentStyles', () => {
  it('should return empty string and warn when component is not defined', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    const theme = { components: {} } as Theme;

    const result = getComponentStyles(theme, 'button', {});

    expect(result).toBe('');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Component button is not defined in the theme',
    );
    consoleWarnSpy.mockRestore();
  });

  it('should return root styles', () => {
    const result = getComponentStyles(testTheme, 'button', {
      root: true,
    });

    expect(result).toBe('btn-base');
  });

  it('should apply string variant styles', () => {
    const result = getComponentStyles(testTheme, 'button', {
      variants: { size: 'small' },
    });

    expect(result).toBe('btn-sm');
  });

  it('should combine root and variant styles', () => {
    const result = getComponentStyles(testTheme, 'button', {
      root: true,
      variants: { size: 'small' },
    });

    expect(result).toBe('btn-base btn-sm');
  });

  it('should apply default variants when useDefaultVariants is true', () => {
    const themeWithDefaults = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
          },
          defaultVariants: { size: 'large' },
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithDefaults, 'button', {});

    expect(result).toBe('btn-lg');
  });

  it('should not apply default variants when useDefaultVariants is false', () => {
    const themeWithDefaults = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
          },
          defaultVariants: { size: 'large' },
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithDefaults, 'button', {}, false);

    expect(result).toBe('');
  });

  it('should override default variants with provided variants', () => {
    const themeWithDefaults = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
          },
          defaultVariants: { size: 'large' },
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithDefaults, 'button', {
      variants: { size: 'small' },
    });

    expect(result).toBe('btn-sm');
  });

  it('should apply boolean variants', () => {
    const themeWithBooleans = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            disabled: 'btn-disabled',
          },
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithBooleans, 'button', {
      variants: { disabled: true },
    });

    expect(result).toBe('btn-disabled');
  });

  it('should not apply boolean variants when false', () => {
    const themeWithBooleans = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            disabled: 'btn-disabled',
          },
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithBooleans, 'button', {
      variants: { disabled: false },
    });

    expect(result).toBe('');
  });

  it('should apply compound variants when all conditions match', () => {
    const themeWithCompound = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
            intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
          },
          compoundVariants: [
            {
              variants: { size: 'small', intent: 'primary' },
              style: 'btn-small-primary',
            },
          ],
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithCompound, 'button', {
      variants: { size: 'small', intent: 'primary' },
    });

    expect(result).toBe('btn-sm btn-primary btn-small-primary');
  });

  it('should not apply compound variants when conditions do not match', () => {
    const themeWithCompound = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
            intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
          },
          compoundVariants: [
            {
              variants: { size: 'small', intent: 'primary' },
              style: 'btn-small-primary',
            },
          ],
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithCompound, 'button', {
      variants: { size: 'large', intent: 'primary' },
    });

    expect(result).toBe('btn-lg btn-primary');
  });

  it('should return root styles when component has no variants defined', () => {
    const simpleTheme = {
      components: {
        button: {
          root: 'btn-base',
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(simpleTheme, 'button', {
      root: true,
    });

    expect(result).toBe('btn-base');
  });

  it('should skip undefined variant values', () => {
    const result = getComponentStyles(testTheme, 'button', {
      variants: { size: undefined },
    });

    expect(result).toBe('');
  });

  it('should apply compound variants with default variants', () => {
    const themeWithCompound = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
            intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
          },
          defaultVariants: { size: 'small', intent: 'primary' },
          compoundVariants: [
            {
              variants: { size: 'small', intent: 'primary' },
              style: 'btn-small-primary',
            },
          ],
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithCompound, 'button', {});

    expect(result).toBe('btn-sm btn-primary btn-small-primary');
  });

  it('should handle multiple compound variants', () => {
    const themeWithMultipleCompound = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
            intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
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
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithMultipleCompound, 'button', {
      variants: { size: 'small', intent: 'primary', disabled: true },
    });

    expect(result).toBe(
      'btn-sm btn-primary btn-disabled btn-small-primary btn-primary-disabled',
    );
  });

  it('should handle multiple root boolean props', () => {
    const themeWithMultipleRoots = {
      components: {
        button: {
          root: 'btn-base',
          fullWidth: 'btn-full-width',
          elevated: 'btn-elevated',
        },
      },
    } as unknown as Theme;

    const result = getComponentStyles(themeWithMultipleRoots, 'button', {
      root: true,
      fullWidth: true,
      elevated: true,
    } as Record<string, boolean>);

    expect(result).toBe('btn-base btn-full-width btn-elevated');
  });

  it('should ignore false boolean props', () => {
    const themeWithBooleans = {
      components: {
        button: {
          root: 'btn-base',
          fullWidth: 'btn-full-width',
          elevated: 'btn-elevated',
        },
      },
    } as unknown as Theme;

    const result = getComponentStyles(themeWithBooleans, 'button', {
      root: true,
      fullWidth: false,
      elevated: true,
    } as Record<string, boolean>);

    expect(result).toBe('btn-base btn-elevated');
  });

  it('should return empty string for non-existent variant values', () => {
    const result = getComponentStyles(testTheme, 'button', {
      variants: { size: 'medium' as unknown as 'small' | 'large' },
    });

    expect(result).toBe('');
  });

  it('should combine all features: root, variants, defaults, and compound', () => {
    const complexTheme = {
      components: {
        button: {
          root: 'btn-base',
          fullWidth: 'btn-full-width',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
            intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
          },
          defaultVariants: { intent: 'secondary' },
          compoundVariants: [
            {
              variants: { size: 'small', intent: 'primary' },
              style: 'btn-small-primary',
            },
          ],
        },
      },
    } as unknown as Theme;

    const result = getComponentStyles(complexTheme, 'button', {
      root: true,
      fullWidth: true,
      variants: { size: 'small', intent: 'primary' },
    } as Record<string, boolean | { size: string; intent: string }>);

    expect(result).toBe(
      'btn-base btn-full-width btn-sm btn-primary btn-small-primary',
    );
  });

  it('should return empty string when no style props provided', () => {
    const result = getComponentStyles(testTheme, 'button', {});

    expect(result).toBe('');
  });

  it('should ignore variants when component has no variants defined', () => {
    const minimalTheme = {
      components: {
        button: {
          root: 'btn-base',
          variants: {},
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(minimalTheme, 'button', {
      root: true,
      variants: { size: 'small' },
    });

    expect(result).toBe('btn-base');
  });

  it('should handle compound variants with partial match from defaults', () => {
    const themeWithCompound = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
            intent: { primary: 'btn-primary', secondary: 'btn-secondary' },
          },
          defaultVariants: { intent: 'primary' },
          compoundVariants: [
            {
              variants: { size: 'small', intent: 'primary' },
              style: 'btn-small-primary',
            },
          ],
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithCompound, 'button', {
      variants: { size: 'small' },
    });

    expect(result).toBe('btn-sm btn-primary btn-small-primary');
  });

  it('should handle empty compoundVariants array', () => {
    const themeWithEmptyCompound = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
          },
          compoundVariants: [],
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithEmptyCompound, 'button', {
      variants: { size: 'small' },
    });

    expect(result).toBe('btn-sm');
  });

  it('should prioritize provided variants over default variants in compound matching', () => {
    const themeWithCompound = {
      components: {
        button: {
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
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(themeWithCompound, 'button', {
      variants: { size: 'small', intent: 'primary' },
    });

    expect(result).toBe('btn-sm btn-primary btn-small-primary');
  });

  it('should handle mixed string and boolean variants', () => {
    const mixedTheme = {
      components: {
        button: {
          root: 'btn-base',
          variants: {
            size: { small: 'btn-sm', large: 'btn-lg' },
            disabled: 'btn-disabled',
            loading: 'btn-loading',
          },
        },
      },
    } satisfies Partial<Theme> as unknown as Theme;

    const result = getComponentStyles(mixedTheme, 'button', {
      variants: { size: 'small', disabled: true, loading: false },
    });

    expect(result).toBe('btn-sm btn-disabled');
  });
});
