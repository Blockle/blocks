import { describe, expect, it, vi } from 'vitest';
import {
  cssValueToNumber,
  getCSSScale,
  getOriginalElementSize,
  parseCSSTransform,
} from './cssMatrixUtils.js';

const createMockStyleDeclaration = (
  transformValues: Partial<Record<'scale' | 'transform', string>>,
): CSSStyleDeclaration => {
  return {
    getPropertyValue: vi
      .fn()
      .mockImplementation(
        (prop: 'scale' | 'transform') => transformValues[prop] || '',
      ),
  } as unknown as CSSStyleDeclaration;
};

describe('cssMatrixUtils', () => {
  describe('parseCSSTransform', () => {
    it('should return identity matrix if transform is not defined', () => {
      const styleDeclaration = createMockStyleDeclaration({});

      const result = parseCSSTransform(styleDeclaration);

      expect(result).toEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 0,
        ty: 0,
      });
    });

    it('should parse a valid matrix transform', () => {
      const styleDeclaration = createMockStyleDeclaration({
        transform: 'matrix(1, 0, 0, 1, 10, 20)',
      });

      const result = parseCSSTransform(styleDeclaration);

      expect(result).toEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 10,
        ty: 20,
      });
    });

    it('should parse a valid matrix transform with other ', () => {
      const styleDeclaration = createMockStyleDeclaration({
        transform: 'rotate(90deg) matrix(1, 0, 0, 1, 10, 20)',
      });

      const result = parseCSSTransform(styleDeclaration);

      expect(result).toEqual({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 10,
        ty: 20,
      });
    });

    it('should throw an error for invalid matrix values', () => {
      const styleDeclaration = createMockStyleDeclaration({
        transform: 'matrix(1, 0, 0, 1, 10)',
      });

      expect(() => parseCSSTransform(styleDeclaration)).toThrowError(
        'Invalid matrix value',
      );
    });
  });

  describe('getCSSScale', () => {
    it('should calculate scale from transform matrix if scale is not defined', () => {
      const styleDeclaration = createMockStyleDeclaration({
        transform: 'matrix(2, 0, 0, 3, 0, 0)',
      });

      const result = getCSSScale(styleDeclaration);

      expect(result).toEqual([2, 3]);
    });

    it('should parse scale when defined as a single value', () => {
      const styleDeclaration = createMockStyleDeclaration({
        scale: '2',
      });

      const result = getCSSScale(styleDeclaration);

      expect(result).toEqual([2, 2]);
    });

    it('should parse scale when defined as two values', () => {
      const styleDeclaration = createMockStyleDeclaration({
        scale: '2 3',
      });

      const result = getCSSScale(styleDeclaration);

      expect(result).toEqual([2, 3]);
    });
  });

  describe('getOriginalElementSize', () => {
    it('should calculate the original size of an element', () => {
      const styleDeclaration = createMockStyleDeclaration({
        scale: '2 3',
      });

      const result = getOriginalElementSize(styleDeclaration, 200, 300);

      expect(result).toEqual([100, 100]);
    });
  });

  describe('cssValueToNumber', () => {
    it('should return 0 for undefined or invalid values', () => {
      expect(cssValueToNumber(undefined)).toBe(0);
      expect(cssValueToNumber('invalid')).toBe(0);
    });

    it('should parse valid numeric values', () => {
      expect(cssValueToNumber('42')).toBe(42);
      expect(cssValueToNumber('3.14')).toBe(3.14);
    });
  });
});
