import { describe, expect, it } from 'vitest';
import { minMediaQuery } from './breakpoint';

describe('minMediaQuery', () => {
  it('should return correct media query for tablet', () => {
    const result = minMediaQuery('tablet');
    expect(result).toBe('screen and (min-width: 740px)');
  });

  it('should return correct media query for desktop', () => {
    const result = minMediaQuery('desktop');
    expect(result).toBe('screen and (min-width: 992px)');
  });

  it('should return correct media query for wide', () => {
    const result = minMediaQuery('wide');
    expect(result).toBe('screen and (min-width: 1200px)');
  });
});
