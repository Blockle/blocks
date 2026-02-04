import { Box, type BoxProps } from '../Box/Box.js';

export type FlexProps = BoxProps;

export const Flex: React.FC<FlexProps> = ({ display = 'flex', ...props }) => {
  return <Box display={display} {...props} />;
};
