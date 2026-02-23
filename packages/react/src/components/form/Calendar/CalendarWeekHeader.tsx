import { Text } from '../../typography/Text/Text.js';

export type CalendarWeekHeaderProps = {
  days: Date[];
};

export const CalendarWeekHeader: React.FC<CalendarWeekHeaderProps> = ({
  days,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
      }}
    >
      {days.map((date) => (
        <Text key={+date} textAlign="center" fontWeight="medium">
          {date.toLocaleString('default', { weekday: 'short' })}
        </Text>
      ))}
    </div>
  );
};
