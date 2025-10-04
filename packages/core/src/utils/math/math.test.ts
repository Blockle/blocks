import { describe, it } from 'vitest';
import { clampAndRoundValue } from './math.js';

describe('clampAndRoundValue', () => {
  it('should round to the nearest step and clamp to min and max', () => {
    // Test cases
    const cases = [
      { newValue: 5.3, min: 0, max: 10, step: 1, expected: 5 },
      { newValue: 5.7, min: 0, max: 10, step: 1, expected: 6 },
      { newValue: -1, min: 0, max: 10, step: 1, expected: 0 },
      { newValue: 11, min: 0, max: 10, step: 1, expected: 10 },
      { newValue: 5.25, min: 0, max: 10, step: 0.5, expected: 5.5 },
      { newValue: 5.1, min: 0, max: 10, step: 0.5, expected: 5 },
    ];

    cases.forEach(({ newValue, min, max, step, expected }) => {
      const result = clampAndRoundValue(newValue, min, max, step);
      if (result !== expected) {
        throw new Error(`Expected ${result} to be ${expected}`);
      }
    });
  });
});
