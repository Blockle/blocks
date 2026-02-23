import { Box } from '../../layout/Box/Box.js';
import { Text } from '../../typography/Text/Text.js';
import { IconButton } from '../IconButton/IconButton.js';

export type CalendarHeaderProps = {
  date: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
    >
      <IconButton onClick={onPreviousMonth}>&lt;</IconButton>
      <Text>
        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Text>
      <IconButton onClick={onNextMonth}>&gt;</IconButton>
    </Box>
  );
};
