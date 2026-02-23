import { describe, expect, it } from 'vitest';

import { getCalendarDays, getFirstDateByWeekStart } from './calendarUtils.js';

describe('getFirstDateByWeekStart', () => {
  it('returns the first day of month when month starts on Monday and weekStart is Monday', () => {
    const result = getFirstDateByWeekStart(2024, 3, 1);

    expect(result).toEqual(new Date(2024, 3, 1));
  });

  it('returns the first day of month when month starts on Sunday and weekStart is Sunday', () => {
    const result = getFirstDateByWeekStart(2024, 8, 0);

    expect(result).toEqual(new Date(2024, 8, 1));
  });

  it('returns closest previous Monday when month does not start on Monday', () => {
    const result = getFirstDateByWeekStart(2024, 8, 1);

    expect(result).toEqual(new Date(2024, 7, 26));
  });

  it('returns closest previous Sunday when month does not start on Sunday', () => {
    const result = getFirstDateByWeekStart(2024, 3, 0);

    expect(result).toEqual(new Date(2024, 2, 31));
  });

  it('falls back to Monday for invalid weekStart values', () => {
    const result = getFirstDateByWeekStart(2024, 8, 7);

    expect(result).toEqual(new Date(2024, 7, 26));
  });
});

describe('getCalendarDays', () => {
  it('returns 42 dates starting from closest previous Monday', () => {
    const result = getCalendarDays(new Date(2024, 8, 1));

    expect(result).toHaveLength(42);
    expect(result[0]).toEqual(new Date(2024, 7, 26));
    expect(result[41]).toEqual(new Date(2024, 9, 6));
  });

  it('starts at the first day when month already starts on Monday', () => {
    const result = getCalendarDays(new Date(2024, 3, 10));

    expect(result[0]).toEqual(new Date(2024, 3, 1));
  });
});
