import { useEffect, useRef, useState } from 'react';

import { useKeyboard } from '../../../hooks/useKeyboard/useKeyboard.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './Calendar.css.js';
import { CalendarDay } from './CalendarDay.js';
import { CalendarHeader } from './CalendarHeader.js';
import { CalendarWeekHeader } from './CalendarWeekHeader.js';
import {
  getCalendarDays,
  updateDayBy,
  updateMonthBy,
} from './calendarUtils.js';

export const useIsFocused = (target: React.RefObject<HTMLElement | null>) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let setBlur = false;
    const element = target.current;

    const handleFocus = () => {
      setBlur = false;
      setIsFocused(true);
    };
    const handleBlur = () => {
      setBlur = true;

      setTimeout(() => {
        if (setBlur) {
          setIsFocused(false);
        }
      }, 0);
    };

    if (element) {
      element.addEventListener('focusin', handleFocus);
      element.addEventListener('focusout', handleBlur);
    }

    return () => {
      if (element) {
        element.removeEventListener('focusin', handleFocus);
        element.removeEventListener('focusout', handleBlur);
      }
    };
  }, [target]);

  return isFocused;
};

export type CalendarProps = {
  weekStart?: 'sunday' | 'monday';
};

export const Calendar: React.FC<CalendarProps> = ({ weekStart = 'monday' }) => {
  const monthRef = useRef<HTMLDivElement>(null);
  const isFocused = useIsFocused(monthRef);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const weekStartIndex = weekStart === 'sunday' ? 0 : 1;
  const days = getCalendarDays(currentDate, weekStartIndex);
  const selectedMonth = currentDate.getMonth();

  useKeyboard(
    'ArrowLeft',
    () => {
      setFocusedDate((prevDate) => updateDayBy(prevDate || selectedDate, -1));
    },
    { enabled: isFocused },
  );
  useKeyboard(
    'ArrowUp',
    () => {
      setFocusedDate((prevDate) => updateDayBy(prevDate || selectedDate, -7));
    },
    { enabled: isFocused },
  );
  useKeyboard(
    'ArrowRight',
    () => {
      setFocusedDate((prevDate) => updateDayBy(prevDate || selectedDate, 1));
    },
    { enabled: isFocused },
  );
  useKeyboard(
    'ArrowDown',
    () => {
      setFocusedDate((prevDate) => updateDayBy(prevDate || selectedDate, 7));
    },
    { enabled: isFocused },
  );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <CalendarHeader
        date={currentDate}
        onPreviousMonth={() => {
          setCurrentDate((prevDate) => updateMonthBy(prevDate, -1));
        }}
        onNextMonth={() => {
          setCurrentDate((prevDate) => updateMonthBy(prevDate, 1));
        }}
      />

      <CalendarWeekHeader days={days.slice(0, 7)} />

      <Box ref={monthRef} display="grid" gap={1} className={styles.weekGrid}>
        {days.map((date) => (
          <CalendarDay
            key={+date}
            date={date}
            isCurrentMonth={date.getMonth() === selectedMonth}
            isSelected={selectedDate?.getTime() === date.getTime()}
            isFocused={focusedDate?.getTime() === date.getTime()}
            onSelect={(date) => {
              setSelectedDate(date);
            }}
          >
            {date.getDate()}
          </CalendarDay>
        ))}
      </Box>
    </Box>
  );
};
