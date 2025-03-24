import {
  type AlignItemsMap,
  type MarginSprinkles,
  type PaddingSprinkles,
  type ResponsiveDisplayFlex,
  type Sprinkles,
  alignItemsMap,
} from '@blockle/blocks-core';
import { Box } from '../Box';

export type StackProps = {
  alignX?: keyof AlignItemsMap;
  tag?: 'div' | 'section' | 'ul' | 'ol';
  children: React.ReactNode;
  className?: string;
  display?: ResponsiveDisplayFlex;
  spacing: Sprinkles['gap'];
  style?: React.CSSProperties;
  role?: React.AriaRole;
  /**
   * Start prop is only valid when tag="ol"
   */
  start?: number;
} & MarginSprinkles &
  PaddingSprinkles;

export const Stack: React.FC<StackProps> = ({
  tag: Tag = 'div',
  display = 'flex',
  children,
  spacing,
  alignX,
  ...restProps
}) => {
  if (import.meta.env.DEV && restProps.start !== undefined && Tag !== 'ol') {
    console.warn('Stack: "start" prop is only valid with tag="ol"');
  }

  return (
    <Box
      asChild
      display={display}
      gap={spacing}
      flexDirection="column"
      alignItems={alignX ? alignItemsMap[alignX] : undefined}
      {...restProps}
    >
      <Tag>{children}</Tag>
    </Box>
  );
};
