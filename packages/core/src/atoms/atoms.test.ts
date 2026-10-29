import { describe, expect, it } from 'vitest';

import { atomicProperties } from './atoms.css.js';
import { atoms } from './atoms.js';

describe('atoms', () => {
  it('should find the class for a property', () => {
    expect(
      atomicProperties.color.values['primary-500'].defaultClass,
    ).toBeDefined();
  });

  it('returns correct class for single string value', () => {
    expect(atoms({ color: 'black' })).toBe(
      atomicProperties.color.values.black.defaultClass,
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

  it('returns a class for minInlineSize 0', () => {
    const className = atoms({ minInlineSize: 0 });

    expect(className).toBeTruthy();
    expect(className).toBe(
      atomicProperties.minInlineSize.values[0].defaultClass,
    );
  });

  it.each([
    'auto',
    'pointer',
    'grab',
    'grabbing',
    'text',
    'not-allowed',
  ] as const)('returns a class for cursor %s', (cursor) => {
    const className = atoms({ cursor });

    expect(className).toBeTruthy();
    expect(className).toBe(atomicProperties.cursor.values[cursor].defaultClass);
  });

  it('rejects a cursor outside the list', () => {
    // @ts-expect-error move is not a cursor value
    expect(atoms({ cursor: 'move' })).toBe('');
  });

  it('returns a class for listStyle none', () => {
    const className = atoms({ listStyle: 'none' });

    expect(className).toBeTruthy();
    expect(className).toBe(atomicProperties.listStyle.values.none.defaultClass);
  });

  it('rejects a listStyle other than none', () => {
    // @ts-expect-error disc is not a listStyle value
    expect(atoms({ listStyle: 'disc' })).toBe('');
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

  describe('mode values', () => {
    it('returns one class per mode', () => {
      const className = atoms({
        color: { light: 'neutral-900', dark: 'neutral-100' },
      });

      expect(className).toBe(
        [
          atomicProperties.color.values['neutral-900'].modeClasses.light,
          atomicProperties.color.values['neutral-100'].modeClasses.dark,
        ].join(' '),
      );
      expect(className.split(' ')).toHaveLength(2);
    });

    it('returns a single class for a plain string', () => {
      expect(atoms({ backgroundColor: 'neutral-900' })).toBe(
        atomicProperties.backgroundColor.values['neutral-900'].defaultClass,
      );
    });

    it('supports backgroundColor and borderColor', () => {
      const value = { light: 'currentColor', dark: 'transparent' } as const;

      expect(atoms({ backgroundColor: value }).split(' ')).toHaveLength(2);
      expect(atoms({ borderColor: value }).split(' ')).toHaveLength(2);
    });

    it('requires every color mode', () => {
      // @ts-expect-error dark is missing
      atoms({ color: { light: 'neutral-900' } });
    });

    it('rejects mode values on properties that do not support them', () => {
      // @ts-expect-error padding takes no mode value
      atoms({ padding: { light: 'small', dark: 'small' } });
    });
  });
});
