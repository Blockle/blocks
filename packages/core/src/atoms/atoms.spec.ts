import { describe, expect, it } from 'vitest';
import { atoms } from './atoms';
import { atomicProperties } from './atoms.css';

describe('atoms', () => {
  it('should find the class for a property', () => {
    expect(atomicProperties.color.values.primary.defaultClass).toBeDefined();
  });

  it('returns correct class for single string value', () => {
    expect(atoms({ color: 'primary' })).toBe(
      atomicProperties.color.values.primary.defaultClass,
    );
  });

  it('returns correct class for single numeric value', () => {
    expect(atoms({ insetInlineStart: 0 })).toBe(
      atomicProperties.insetInlineStart.values[0].defaultClass,
    );
  });

  it('returns correct classes for array string value', () => {
    expect(atoms({ display: ['block', 'block'] })).toBe(
      [
        atomicProperties.display.values.block.defaultClass,
        // Get second condition from value `block`
        atomicProperties.display.values.block.conditions[1],
      ].join(' '),
    );
  });

  it('returns correct classes for  numeric value', () => {
    expect(atoms({ flexGrow: [1, 0] })).toBe(
      [
        atomicProperties.flexGrow.values[1].defaultClass,
        // Get second condition from value `0`
        atomicProperties.flexGrow.values[0].conditions[1],
      ].join(' '),
    );
  });

  it('returns empty string for unknown property', () => {
    // @ts-expect-error testing unknown property
    expect(atoms({ unknown: 'value' })).toBe('');
  });

  it('returns empty string for unknown value', () => {
    // @ts-expect-error testing unknown value
    expect(atoms({ color: 'green' })).toBe('');

    // @ts-expect-error testing unknown value
    expect(atoms({ insetBlock: 42 })).toBe('');
  });

  it('handles empty input', () => {
    expect(atoms({})).toBe('');
  });

  it('handles array with missing conditions gracefully', () => {
    // @ts-expect-error testing missing conditions
    expect(atoms({ color: ['red', 'red', 'red'] })).toBe('');

    // @ts-expect-error testing missing conditions
    expect(atoms({ display: ['nope', 'nope'] })).toBe('');
  });
});
