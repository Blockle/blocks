export type CalendarProps = {
  /** The currently selected date */
  selectedDate: Date;
  /** Callback when a date is selected */
  onDateSelect: (date: Date) => void;
  /** The month to display */
  month: number; // 0-11
  /** The year to display */
  year: number;
  /** Optional: Minimum selectable date */
  minDate?: Date;
  /** Optional: Maximum selectable date */
  maxDate?: Date;
};

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  month,
  year,
  minDate,
  maxDate,
}) => {
  // Component implementation goes here
  return <div>Calendar Component</div>;
};

export type CalendarOptionProps = {
  date: Date;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (date: Date) => void;
  children?: React.ReactNode;
};

export const CalendarOption: React.FC<CalendarOptionProps> = (props) => {
  // Option component implementation goes here
  return <div>Calendar Option Component</div>;
};

// <Calendar>
//  <CalendarOption date="2024-06-15" />
//  <CalendarOption date="2024-06-15" />
//  <CalendarOption date="2024-06-21">
//    I show in a tooltip or some kind of popup
//  </CalendarOption>
// </Calendar>
