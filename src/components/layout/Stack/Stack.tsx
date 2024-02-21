import { Atoms, MarginAtoms, PaddingAtoms, ResponsiveDisplayFlex } from '../../../lib/css/atoms';
import { AlignItemsMap, alignItemsMap } from '../../../lib/css/flexbox/flexbox';
import { Box } from '../Box';

export type StackProps = {
  alignX?: keyof AlignItemsMap;
  tag?: 'div' | 'section' | 'ul' | 'ol';
  children: React.ReactNode;
  className?: string;
  display?: ResponsiveDisplayFlex;
  gap: Atoms['gap'];
  style?: React.CSSProperties;
  role?: React.AriaRole;
  /**
   * Start prop is only valid when tag="ol"
   */
  start?: number;
} & MarginAtoms &
  PaddingAtoms;

export const Stack: React.FC<StackProps> = ({
  tag: Tag = 'div',
  display = 'flex',
  children,
  gap,
  alignX,
  ...restProps
}) => {
  if (process.env.NODE_ENV === 'development' && restProps.start !== undefined && Tag !== 'ol') {
    console.warn('Stack: start prop is only valid when tag="ol"');
  }

  return (
    <Box
      asChild
      display={display}
      gap={gap}
      flexDirection="column"
      alignItems={alignX ? alignItemsMap[alignX] : undefined}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
