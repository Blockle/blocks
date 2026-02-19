import { describe, expect, it } from 'vitest';

import { getNameFromVanillaCSSVar } from './getNameFromVanillaCSSVar.js';

describe('getNameFromVanillaCSSVar', () => {
  it('extracts a simple variable name from var(--name)', () => {
    expect(getNameFromVanillaCSSVar('var(--variableName)')).toBe(
      '--variableName',
    );
  });

  it('extracts names containing dashes and numbers', () => {
    expect(getNameFromVanillaCSSVar('var(--color-primary-100)')).toBe(
      '--color-primary-100',
    );
  });

  it('returns an empty string for var()', () => {
    expect(getNameFromVanillaCSSVar('var()')).toBe('');
  });
});
