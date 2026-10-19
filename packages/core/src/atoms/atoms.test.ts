import { describe, expect, it } from 'vitest';

import { atomicProperties } from './atoms.css.js';
import { atoms } from './atoms.js';

describe('atoms', () => {
  it('should find the class for a property', () => {
    expect(atomicProperties.color.values.primary.defaultClass).toBeDefined();
  });

  it('returns correct class for single string value', () => {
    expect(atoms({ color: 'text' })).toBe(
      atomicProperties.color.values.text.defaultClass,
    );
  });

  it('returns classes for Color roles', () => {
    expect(atoms({ backgroundColor: 'surface' })).toBe(
      atomicProperties.backgroundColor.values.surface.defaultClass,
    );
    expect(atoms({ color: 'textMuted' })).toBe(
      atomicProperties.color.values.textMuted.defaultClass,
    );
    expect(atoms({ borderColor: 'borderStrong' })).toBe(
      atomicProperties.borderColor.values.borderStrong.defaultClass,
    );
    expect(atoms({ backgroundColor: 'surface' })).toBeTruthy();
    expect(atoms({ color: 'textMuted' })).toBeTruthy();
  });

  it('returns classes for currentColor and transparent', () => {
    expect(atoms({ backgroundColor: 'transparent' })).toBe(
      atomicProperties.backgroundColor.values.transparent.defaultClass,
    );
    expect(atoms({ borderColor: 'currentColor' })).toBe(
      atomicProperties.borderColor.values.currentColor.defaultClass,
    );
  });

  it('rejects Palette values for color properties', () => {
    // @ts-expect-error Palette shades are not Color roles
    expect(atoms({ backgroundColor: 'primary-100' })).toBe('');

    // @ts-expect-error Palette colors are not Color roles
    expect(atoms({ color: 'white' })).toBe('');

    // @ts-expect-error Palette shades are not Color roles
    expect(atoms({ borderColor: 'neutral-300' })).toBe('');
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

  it('returns a class for letterSpacing', () => {
    const className = atoms({ letterSpacing: 'wide' });

    expect(className).toBeTruthy();
    expect(className).toBe(
      atomicProperties.letterSpacing.values.wide.defaultClass,
    );
  });

  it('returns a class for the display fontSize', () => {
    const className = atoms({ fontSize: 'display' });

    expect(className).toBeTruthy();
    expect(className).toBe(
      atomicProperties.fontSize.values.display.defaultClass,
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
