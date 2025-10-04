import { describe, it } from 'vitest';
import { roundToPrecision } from './math.js';

describe('roundToPrecision', () => {
  it('should round to the specified precision', () => {
    // Test cases
    const cases = [
      { value: 1.2345, precision: 2, expected: 1.23 },
      { value: 1.2355, precision: 3, expected: 1.236 },
      { value: 1.2, precision: 0, expected: 1 },
      { value: 1.5, precision: 0, expected: 2 },
      { value: -1.2345, precision: 2, expected: -1.23 },
      { value: -1.2355, precision: 2, expected: -1.24 },
    ];

    cases.forEach(({ value, precision, expected }) => {
      const result = roundToPrecision(value, precision);
      if (result !== expected) {
        throw new Error(`Expected ${result} to be ${expected}`);
      }
    });
  });
});
