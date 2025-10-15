import { describe, expect, it } from 'vitest';

import { clampAndRoundValue } from './math.js';

describe('clampAndRoundValue', () => {
  describe('basic rounding and clamping', () => {
    it.each([
      {
        newValue: 5.3,
        min: 0,
        max: 10,
        step: 1,
        expected: 5,
        description: 'rounds down when closer to lower step',
      },
      {
        newValue: 5.7,
        min: 0,
        max: 10,
        step: 1,
        expected: 6,
        description: 'rounds up when closer to higher step',
      },
      {
        newValue: 5.5,
        min: 0,
        max: 10,
        step: 1,
        expected: 6,
        description: 'rounds up when exactly between steps',
      },
      {
        newValue: 5.25,
        min: 0,
        max: 10,
        step: 0.5,
        expected: 5.5,
        description: 'rounds to nearest half step',
      },
      {
        newValue: 5.1,
        min: 0,
        max: 10,
        step: 0.5,
        expected: 5,
        description: 'rounds to nearest half step (down)',
      },
    ])(
      '$description: clampAndRoundValue($newValue, $min, $max, $step) = $expected',
      ({ newValue, min, max, step, expected }) => {
        expect(clampAndRoundValue(newValue, min, max, step)).toBe(expected);
      },
    );
  });

  describe('clamping behavior', () => {
    it.each([
      {
        newValue: -1,
        min: 0,
        max: 10,
        step: 1,
        expected: 0,
        description: 'clamps to minimum when value below range',
      },
      {
        newValue: 11,
        min: 0,
        max: 10,
        step: 1,
        expected: 10,
        description: 'clamps to maximum when value above range',
      },
      {
        newValue: -5.7,
        min: 2,
        max: 8,
        step: 1,
        expected: 2,
        description: 'clamps to minimum after rounding',
      },
      {
        newValue: 12.3,
        min: 2,
        max: 8,
        step: 1,
        expected: 8,
        description: 'clamps to maximum after rounding',
      },
    ])(
      '$description: clampAndRoundValue($newValue, $min, $max, $step) = $expected',
      ({ newValue, min, max, step, expected }) => {
        expect(clampAndRoundValue(newValue, min, max, step)).toBe(expected);
      },
    );
  });

  describe('edge cases', () => {
    it('handles value exactly at minimum', () => {
      expect(clampAndRoundValue(0, 0, 10, 1)).toBe(0);
    });

    it('handles value exactly at maximum', () => {
      expect(clampAndRoundValue(10, 0, 10, 1)).toBe(10);
    });

    it('handles when min equals max', () => {
      expect(clampAndRoundValue(5, 7, 7, 1)).toBe(7);
      expect(clampAndRoundValue(10, 7, 7, 1)).toBe(7);
    });

    it('handles very small step values', () => {
      expect(clampAndRoundValue(5.123, 0, 10, 0.01)).toBeCloseTo(5.12, 2);
    });

    it('handles large step values', () => {
      expect(clampAndRoundValue(13, 0, 20, 5)).toBe(15);
      expect(clampAndRoundValue(7, 0, 20, 5)).toBe(5);
    });

    it('handles negative ranges', () => {
      expect(clampAndRoundValue(-2.3, -10, -1, 1)).toBe(-2);
      expect(clampAndRoundValue(-15, -10, -1, 1)).toBe(-10);
    });

    it('handles zero as input', () => {
      expect(clampAndRoundValue(0, -5, 5, 1)).toBe(0);
    });
  });

  describe('floating point precision', () => {
    it('handles decimal steps without precision issues', () => {
      expect(clampAndRoundValue(0.1 + 0.2, 0, 1, 0.1)).toBeCloseTo(0.3, 10);
    });

    it('handles repeating decimal steps', () => {
      expect(clampAndRoundValue(1 / 3, 0, 1, 0.1)).toBeCloseTo(0.3, 1);
    });
  });
});
