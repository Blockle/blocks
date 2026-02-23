const SUNDAY = 0;
const MONDAY = 1;

type WeekStart = typeof MONDAY | typeof SUNDAY;

export function getFirstDateByWeekStart(
  year: number,
  month: number,
  weekStart: WeekStart,
): Date {
  const normalizedWeekStart = weekStart === SUNDAY ? SUNDAY : MONDAY;
  const firstDateOfMonth = new Date(year, month, 1);
  const daysToSubtract =
    (firstDateOfMonth.getDay() - normalizedWeekStart + 7) % 7;

  return new Date(year, month, 1 - daysToSubtract);
}

export function getCalendarDays(
  date: Date,
  weekStart: WeekStart = MONDAY,
): Date[] {
  const startDate = getFirstDateByWeekStart(
    date.getFullYear(),
    date.getMonth(),
    weekStart,
  );
  const dateIterator = new Date(startDate);
  const calendarDays: Date[] = [];

  // Generate 42 days to cover 6 weeks (6 rows in calendar)
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(dateIterator));
    dateIterator.setDate(dateIterator.getDate() + 1);
  }

  return calendarDays;
}

export function updateMonthBy(date: Date, increment: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + increment);

  return newDate;
}

export function updateDayBy<TDate extends Date | null>(
  date: TDate,
  increment: number,
): TDate {
  if (!date) {
    return null as TDate;
  }

  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + increment);

  return newDate as TDate;
}

export function getDateString(date: Date): string {
  return date.toISOString().substring(0, 10);
}
