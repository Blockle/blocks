import { Atoms, MarginAndPaddingAtoms, ResponsiveDisplayFlex } from '../../lib/css/atoms';
import { AlignItemsMap, alignItemsMap } from '../../lib/css/flexbox/flexbox';
import { Box } from '../Box/Box';

export type StackProps = {
  as?: 'div' | 'section' | 'ul' | 'ol';
  children: React.ReactNode;
  alignX?: keyof AlignItemsMap;
  gap: Atoms['gap'];
  display?: ResponsiveDisplayFlex;
  className?: string;
  /**
   * Start prop is only valid when as="ol"
   */
  start?: number;
} & MarginAndPaddingAtoms;

export const Stack: React.FC<StackProps> = ({
  as = 'div',
  display = 'flex',
  children,
  gap,
  alignX,
  ...restProps
}) => {
  if (process.env.NODE_ENV === 'development' && restProps.start !== undefined && as !== 'ol') {
    console.warn('Stack: start prop is only valid when as="ol"');
  }

  return (
    <Box
      as={as}
      display={display}
      gap={gap}
      flexDirection="column"
      alignItems={alignX ? alignItemsMap[alignX] : undefined}
      {...restProps}
    >
      {children}
    </Box>
  );
};
