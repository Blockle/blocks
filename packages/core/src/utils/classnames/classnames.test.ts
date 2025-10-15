import { describe, expect, it } from 'vitest';

import { classnames } from './classnames.js';

describe('classnames', () => {
  it('should return undefined for empty result so react doesn\'t add "class" attribute', () => {
    expect(classnames()).toBe(undefined);
  });

  it('should return a single class name', () => {
    expect(classnames('class1')).toBe('class1');
  });

  it('should join multiple class names with a space', () => {
    expect(classnames('class1', 'class2')).toBe('class1 class2');
  });

  it('should filter out non-string values', () => {
    expect(classnames('class1', null, undefined, false, 'class2')).toBe(
      'class1 class2',
    );
  });

  it('should return undefined if all arguments are non-string values', () => {
    expect(classnames(null, undefined, false)).toBe(undefined);
  });
});
