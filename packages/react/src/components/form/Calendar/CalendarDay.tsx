import { classnames } from '@blockle/blocks-core';
import { useEffect, useRef } from 'react';

import { Box } from '../../layout/Box/Box.js';
import * as styles from './CalendarDay.css.js';
import { getDateString } from './calendarUtils.js';

export type CalendarDayProps = {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  onSelect: (date: Date) => void;
  children: React.ReactNode;
  isFocused: boolean;
  // disabled?: boolean;
};

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  isSelected,
  onSelect,
  children,
  isFocused,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const isToday = getDateString(new Date()) === getDateString(date);
  const handleClick = () => {
    onSelect(date);
  };

  useEffect(() => {
    if (isFocused) {
      // Focus the button when it becomes focused
      ref.current?.focus();
    }
  }, [isFocused]);

  return (
    <Box asChild>
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={classnames(
          styles.day,
          isSelected && styles.daySelected,
          isToday && styles.dayToday,
          !isCurrentMonth && styles.dayOutsideMonth,
        )}
      >
        {children}
      </button>
    </Box>
  );
};
