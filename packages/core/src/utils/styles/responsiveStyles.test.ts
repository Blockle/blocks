import { describe, expect, it, vi } from 'vitest';

import {
  createResponsiveStyles,
  getResponsiveStyle,
} from './responsiveStyles.js';

vi.mock('@vanilla-extract/css', async (importActual) => {
  const actual = await importActual<typeof import('@vanilla-extract/css')>();
  return {
    ...actual,
    style: () => {
      return 'mock-class';
    },
  };
});

describe('responsiveStyles', () => {
  describe('createResponsiveStyles', () => {
    it('should create responsive styles for given keys', () => {
      const keys = ['small', 'medium', 'large'];
      const stylesFn = (key: string) => ({ fontSize: key });

      const result = createResponsiveStyles(keys, stylesFn);

      expect(result).toHaveProperty('small');
      expect(result).toHaveProperty('medium');
      expect(result).toHaveProperty('large');
      expect(result.small).toHaveLength(4);
    });

    it('should create styles for all breakpoints', () => {
      const keys: 'test'[] = ['test'];
      const stylesFn = (key: 'test') => ({ color: key });

      const result = createResponsiveStyles(keys, stylesFn);

      expect(result.test).toBeDefined();
      expect(result.test[0]).toBeDefined();
      expect(result.test[1]).toBeDefined();
      expect(result.test[2]).toBeDefined();
      expect(result.test[3]).toBeDefined();
    });
  });

  describe('getResponsiveStyle', () => {
    const mockStyles = createResponsiveStyles(
      ['small', 'medium', 'large'],
      (key) => ({ padding: key }),
    );

    it('should return undefined for undefined value', () => {
      const result = getResponsiveStyle(mockStyles, undefined);

      expect(result).toBeUndefined();
    });

    it('should return single class for non-array value', () => {
      const result = getResponsiveStyle(mockStyles, 'small');

      expect(result).toBe('mock-class');
    });

    it('should return combined classes for array value', () => {
      const result = getResponsiveStyle(mockStyles, [
        'small',
        'medium',
        'large',
        'small',
      ]);

      expect(result).toBe('mock-class mock-class mock-class mock-class');
    });
  });
});
